import { Context } from "koa";

import { processRefreshToken } from "../../../services/passport";

export default async (ctx: Context) => {
  const { refreshToken } = ctx.request.body;
  ctx.body = await processRefreshToken(refreshToken);
};
