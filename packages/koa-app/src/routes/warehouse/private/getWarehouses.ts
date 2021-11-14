import { Context } from "koa";

import Warehouse from "../../../models/Warehouse";

export default async (ctx: Context) => {
  ctx.body = await Warehouse.find();
};
