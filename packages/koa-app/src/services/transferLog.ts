/* eslint-disable no-console */
import axios from "axios";
import BigNumber from "bignumber.js";
import { find } from "lodash";
import schedule from "node-schedule";

import config from "../config";
import Asset, { AssetState } from "../models/Asset";
import Config from "../models/Config";

import { token, web3 } from "./contracts";

const TRANSFER_LOG_FROM_BLOCK = "transfer_log_from_block";

let passed = true;

async function getPastEvents() {
  passed = false;
  console.log("[CRON][transferLog] triggered");

  try {
    let fromBlockObj = await Config.findOne({ key: TRANSFER_LOG_FROM_BLOCK });
    if (!fromBlockObj) {
      fromBlockObj = await Config.create({
        key: TRANSFER_LOG_FROM_BLOCK,
        value: 0
      });
    }
    let fromBlock = fromBlockObj.value;
    if (fromBlock < config.minFromBlock) fromBlock = config.minFromBlock;

    let toBlock = await web3.eth.getBlockNumber();
    toBlock -= 1; // minus 1 to avoid missing events
    if (fromBlock > toBlock) fromBlock = toBlock;
    else if (toBlock >= fromBlock + 1000) toBlock = fromBlock + 1000;

    if (fromBlock < toBlock) { // need to get past events
      const logs = await token.contract.getPastEvents("TransferSingle", {
        fromBlock,
        toBlock,
      });
      console.log(`[CRON][transferLog] checking blocks from ${fromBlock} to ${toBlock}`);

      for (let i = 0; i < logs.length; i += 1) {
        const log = logs[i];

        // save eventLog to db
        // save params to db
        const logValues = log.returnValues;

        const { from: fromAddress, to: toAddress, id: tokenID, value } = logValues;
        console.log(`[CRON][transferLog] transfer of ${tokenID} from ${fromAddress} to ${toAddress}`);

        const zeroAddress = new BigNumber(0);
        if (zeroAddress.isEqualTo(fromAddress)) {
          // if transaction is mint
          console.log(`[CRON][transferLog] mint of ${tokenID}`);
          // eslint-disable-next-line no-await-in-loop
          const uri = await token.contract.methods.uri(tokenID).call();
          if (uri) {
            console.log(`[CRON][transferLog] with uri ${uri}`);
            // eslint-disable-next-line no-await-in-loop
            const { status, data: metadata } = await axios.get(uri.replace("ipfs://", "https://ipfs.io/ipfs/"));
            if (status === 200) {
              console.log(`[CRON][transferLog] with metadata ${metadata}`);
              if (metadata && metadata.attributes) {
                const assetIDAttr = find(metadata.attributes, { trait_type: "Asset ID" });
                if (assetIDAttr) {
                  const assetID = assetIDAttr.value;
                  console.log(`[CRON][transferLog] with Asset ID ${assetID}`);
                  // eslint-disable-next-line no-await-in-loop
                  const asset = await Asset.findOne({ assetId: assetID });
                  if (asset) {
                    console.log(`[CRON][transferLog] setting Token ID ${tokenID} for Asset ${assetID}`);
                    // eslint-disable-next-line no-await-in-loop
                    await asset.update({ tokenId: tokenID });
                  }
                }
              }
            }
          }
        } else if (zeroAddress.isEqualTo(toAddress)) {
          // if transaction is burn
          console.log(`[CRON][transferLog] burn of ${tokenID}`);
          // eslint-disable-next-line no-await-in-loop
          const asset = await Asset.findOne({ tokenId: tokenID });
          if (asset) {
            console.log(`[CRON][transferLog] Asset ${asset.assetId} is redeemed`);
            // eslint-disable-next-line no-await-in-loop
            await asset.update({ state: AssetState.Redeemed });
          }
        }
      }

      await fromBlockObj.update({ value: toBlock });
    }
  } catch (err) {
    console.error(`[CRON][transferLog] error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`);
  }

  passed = true;
}

function start() {
  if (passed) {
    getPastEvents();
  }
}

export default function startCron() {
  console.log("[CRON][transferLog] started ...");
  schedule.scheduleJob("*/10 * * * * *", start); // running per 10 secs
};
