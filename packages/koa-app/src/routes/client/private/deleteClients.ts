import { Context } from "koa";

import Client from "../../../models/Client";

export default async (ctx: Context) => {
  const { ids } = ctx.request.body;
  await Client.deleteMany({_id: ids});
  
  ctx.body = await Client.find();
};
