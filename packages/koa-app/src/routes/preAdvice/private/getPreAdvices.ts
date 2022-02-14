import { Context } from "koa";

import PreAdvice from "../../../models/PreAdvice";

export default async (ctx: Context) => {
  ctx.body = await PreAdvice.find().populate(
    "owner transferringWarehouse arrivalWarehouse"
  );
};
