import { Context } from "koa";

import Client from "../../../models/Client";

export default async (ctx: Context) => {
  await Client.findByIdAndRemove(ctx.params.clientId);

  ctx.status = 200;
};
