import { Context, Request } from "koa";

import Asset from "../../../models/Asset";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface GetAssetRequest extends Request {
  params: {
    assetId: string
  }
}

export default async (ctx: ExtendedContext<GetAssetRequest>) => {
  ctx.body = await Asset.findById(ctx.request.params.assetId)
    .populate({
      path: "product",
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "arrivalWarehouse",
      },
    });
};
