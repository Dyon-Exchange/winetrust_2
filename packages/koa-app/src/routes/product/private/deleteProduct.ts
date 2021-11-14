import { Context } from "koa";

import Product from "../../../models/Product";

export default async (ctx: Context) => {
  await Product.findByIdAndRemove(ctx.params.productId);

  ctx.status = 200;
};
