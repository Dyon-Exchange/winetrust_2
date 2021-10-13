import multer from "@koa/multer";
import { AxiosError } from "axios";
import { Request } from "koa";

import uploadAssetMetadataToIPFS from "../../../helpers/asset/uploadAssetMetadataToIPFS";
import Asset from "../../../models/Asset";
import { ProductClass } from "../../../models/Product";
import { WarehouseClass } from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateAssetMetadataBody extends Request {
  file: multer.File;
  body: {
    assetId: string;
    externalURL: string;
  };
}

export default async (ctx: ExtendedContext<CreateAssetMetadataBody>) => {
  const initialConditionReport = ctx.request.file;

  const { externalURL, assetId } = ctx.request.body;

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

    // const initialConditionReportHash = await uploadFileToIPFS(
    //   initialConditionReport
    // );

    // const initialConditionReportHash =
    //   "QmbGg2TePa9LUV9ghADvpQwCTbUGPQJPBg7uND9ZLjtgn4";

    // const metadataHash = await uploadAssetMetadataToIPFS(
    //   asset._id,
    //   asset.product as ProductClass,
    //   (asset as any).preAdvice.arrivalWarehouse as WarehouseClass & {
    //     _id: string;
    //   },
    //   initialConditionReportHash,
    //   externalURL
    // );

    // asset.initialConditionReport = initialConditionReportHash;
    // asset.metadataHash = metadataHash;

    // await asset.save();

    // // Return the created hash for the metadata
    // ctx.body = `ipfs://${metadataHash}`;

    ctx.body = "ipfs://Qmb7vBcXUQMWYriNwyFJJH6kmPnTYuZUaY8W9YK76EE9yL";

    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.throw(
      500,
      (error as AxiosError).response?.data ||
        "Error uploading image file to IPFS"
    );
  }
};
