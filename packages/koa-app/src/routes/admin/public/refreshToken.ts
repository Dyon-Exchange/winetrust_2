import { Request } from "koa";

import { processRefreshToken } from "../../../services/passport";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface RefreshTokenRequest extends Request {
  body: {
    refreshToken: string;
  };
}

export default async (ctx: ExtendedContext<RefreshTokenRequest>) => {
  const { refreshToken } = ctx.request.body;
  ctx.body = await processRefreshToken(refreshToken);
};
