
import { Request } from "koa";

import Admin, { AdminClass } from "../../../models/Admin";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default async (ctx: ExtendedContext<SignupRequest>) => {
  const { email, password } = ctx.request.body;

  const account = await Admin.findOne({ email });

  if (account === undefined || account === null) {
    await Admin.create({
        email,
        password,
    } as AdminClass);
  }

  ctx.status = 200;
};
