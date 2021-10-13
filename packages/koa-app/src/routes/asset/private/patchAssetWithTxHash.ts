import { Context, Request } from "koa";

import Asset from "../../../models/Asset";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateAssetMetadataBody extends Request {
  body: {
    txHash: string;
  };
  query: {
    assetId: string;
  };
}

export default async (ctx: ExtendedContext<CreateAssetMetadataBody>) => {
  console.log(ctx.query);
  console.log(ctx.body);

  ctx.status = 404;
  //   ctx.body =
};
