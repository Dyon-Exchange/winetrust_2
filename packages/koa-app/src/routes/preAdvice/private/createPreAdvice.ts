import { Request } from "koa";

import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreatePreAdviceRequest extends Request {
  body: {};
}

export default async (ctx: ExtendedContext<CreatePreAdviceRequest>) => {
  ctx.status = 200;
};
