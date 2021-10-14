import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request } from "koa";

import Admin from "../../../models/Admin";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default async (ctx: ExtendedContext<LoginRequest>) => {
  const { email, password } = ctx.request.body;

  const account = await Admin.findOne({ email });

  if (account === undefined || account === null) {
    ctx.throw(404, "Account not found.");
  }

  if (!(await compare(password, account.password))) {
    ctx.throw(401, "Email or Password is incorrect");
  }

  const payload = {
    id: account._id,
  };
  // { expiresIn: 36000 }
  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 5 });
  const refreshToken = sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  ctx.body = { token, refreshToken };
};
