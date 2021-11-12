import { Context } from "koa";

import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  const { ids } = ctx.request.body;
  await Asset.deleteMany({_id: ids});
  
  ctx.body = await Asset.find();
};