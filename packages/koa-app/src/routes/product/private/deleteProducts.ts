import { Context } from "koa";

import Product from "../../../models/Product";

export default async (ctx: Context) => {
  const { ids } = ctx.request.body;
  await Product.deleteMany({_id: ids});
  
  ctx.body = await Product.find();
};
