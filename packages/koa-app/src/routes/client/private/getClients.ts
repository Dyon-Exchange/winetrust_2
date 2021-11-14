import { Context } from "koa";

import Client from "../../../models/Client";

export default async (ctx: Context) => {
  ctx.body = await Client.find();
};
