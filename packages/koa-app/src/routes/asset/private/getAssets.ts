import { Context } from "koa";

import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  ctx.body = await Asset.find().populate("preAdvice product");
};
