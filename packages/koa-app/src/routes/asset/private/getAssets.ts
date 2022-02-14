import { Context } from "koa";

import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  ctx.body = await Asset.find()
    .populate({
      path: "client",
      populate: {
        path: "firstName",
      }
    })
    .populate({
      path: "client",
      populate: {
        path: "lastName",
      }
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "owner",
      },
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "firstName"
      }
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
