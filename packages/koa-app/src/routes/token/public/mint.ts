import { Context } from "koa";

export default async (ctx: Context) => {
  ctx.body = { token: "Success" };
};
