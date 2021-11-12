import { Context } from "koa";

import PreAdvice from "../../../models/PreAdvice";


export default async (ctx: Context) => {
  const { ids } = ctx.request.body;
  await PreAdvice.deleteMany({_id: ids});
  
  ctx.body = await PreAdvice.find();
};