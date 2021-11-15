
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
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

  let account = await Admin.findOne({ email });

  if (account === undefined || account === null) {
    account = await Admin.create({
        email,
        password,
    } as AdminClass);
  }

  const payload = {
    id: account._id,
  };

  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 36000 });
  const refreshToken = sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  ctx.body = { token, refreshToken };
  ctx.status = 200;
};
