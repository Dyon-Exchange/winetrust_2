import { Context, Request } from "koa";

import Asset from "../../../models/Asset";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateAssetMetadataBody extends Request {
  body: {
    txHash: string;
  };
  query: {
    "asset-id": string;
  };
}

export default async (ctx: ExtendedContext<CreateAssetMetadataBody>) => {
  const assetId = ctx.request.query["asset-id"];

  const asset = await Asset.findById(assetId);

  asset.txHash = ctx.request.body.txHash;

  await asset.save();

  ctx.status = 200;
};
