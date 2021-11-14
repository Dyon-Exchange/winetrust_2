import { Context } from "koa";

import Product from "../../../models/Product";

export default async (ctx: Context) => {
  ctx.body = await Product.find();
};
