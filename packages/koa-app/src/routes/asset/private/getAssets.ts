import { Context } from "koa";

import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  ctx.body = await Asset.find()
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
};
