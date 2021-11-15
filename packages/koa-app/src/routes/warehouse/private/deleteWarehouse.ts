import { Context } from "koa";

import Warehouse from "../../../models/Warehouse";

export default async (ctx: Context) => {
  await Warehouse.findByIdAndRemove(ctx.params.warehouseId);

  ctx.status = 200;
};
