import { Context } from "koa";

import PreAdvice from "../../../models/PreAdvice";
import Asset from "../../../models/Asset";
import { mongoose } from "@typegoose/typegoose";

export default async (ctx: Context) => {
  let query = await Asset.find({
    preAdvice: new mongoose.Types.ObjectId(ctx.params.preadviceId),
  })
    .populate({
      path: "product",
    })
    .exec();
  ctx.body = {
    data: query,
    count: query.length,
  };
  ctx.status = 200;
};
