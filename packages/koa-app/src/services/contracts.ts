import fs from "fs-extra";
import Web3 from "web3";

import config from "../config";

export const web3 = new Web3(config.web3Provider);

const tokenAddress = config.tokenContractAddress;
const tokenContract = new web3.eth.Contract(fs.readJSONSync("./src/services/WineTrustToken.json").abi, tokenAddress);

export const token = {
  address: tokenAddress,
  contract: tokenContract,
};
