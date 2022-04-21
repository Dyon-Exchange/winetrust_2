import { AxiosError } from "axios";
import { Request } from "koa";

import uploadAssetMetadataToIPFS from "../../../helpers/asset/uploadAssetMetadataToIPFS";
import uploadFileToIPFS from "../../../helpers/uploadFileToIPFS";
import Asset from "../../../models/Asset";
import { ProductClass } from "../../../models/Product";
import { WarehouseClass } from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateAssetMetadataBody extends Request {
  body: {
    assetId: string;
    externalURL: string;
    initialConditionText: string;
  };
}

const imageFieldsMap = {
  "initial-condition-report": "initialConditionReport",
  "initial-condition-report2": "initialConditionReport2",
  "initial-condition-report3": "initialConditionReport3",
  "initial-condition-report4": "initialConditionReport4",
  "initial-condition-report5": "initialConditionReport5",
  "initial-condition-report6": "initialConditionReport6",
};

export default async (ctx: ExtendedContext<CreateAssetMetadataBody>) => {
  const { files } = ctx.request;

  const { externalURL, initialConditionText, assetId } = ctx.request.body;

  //   Potentially sign the tx on the frontend and send the signed tx to the backend, which executes it and waits for the tx hash

  try {
    const asset = await Asset.findById(assetId)
      .populate({
        path: "preAdvice",
        populate: {
          path: "owner",
        },
      })
      .populate({
        path: "preAdvice",
        populate: {
          path: "transferringWarehouse",
        },
      })
      .populate({
        path: "preAdvice",
        populate: {
          path: "arrivalWarehouse",
        },
      })
      .populate({
        path: "product",
      });

    if (!asset) throw new Error("Asset not found");

    let initialConditionReportHash;

    // eslint-disable-next-line no-restricted-syntax
    for (const fieldFiles of Object.values(files)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of fieldFiles) {
        const propName = imageFieldsMap[file.fieldname];
        if (propName) {
          // eslint-disable-next-line no-await-in-loop
          const hash = await uploadFileToIPFS(
            file
          );
          asset[propName] = hash;

          if (propName === "initialConditionReport") {
            initialConditionReportHash = hash;
          }
        }
      }
    }

    const metadataHash = await uploadAssetMetadataToIPFS(
      asset.assetId,
      asset.product as ProductClass,
      (asset as any).preAdvice.arrivalWarehouse as WarehouseClass & {
        _id: string;
      },
      initialConditionReportHash,
      externalURL
    );

    asset.initialConditionText = initialConditionText;
    asset.metadataHash = metadataHash;

    await asset.save();

    // Return the created hash for the metadata
    ctx.body = `ipfs://${metadataHash}`;

    ctx.status = 200;
  } catch (error) {
    ctx.throw(
      500,
      (error as AxiosError).response?.data ||
      "Error uploading image file to IPFS"
    );
  }
};
