import { Context } from "koa";

import Warehouse from "../../../models/Warehouse";

export default async (ctx: Context) => {
  const { ids } = ctx.request.body;
  await Warehouse.deleteMany({_id: ids});
  
  ctx.body = await Warehouse.find();
}
