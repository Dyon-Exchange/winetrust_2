import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Context } from "koa";

import Admin from "../../../models/Admin";

interface LoginRequestBody {
  email: string;
  password: string;
}

export default async (ctx: Context) => {
  const { email, password } = ctx.request.body as LoginRequestBody;

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

  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 36000 });
  const refreshToken = sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  ctx.body = { token, refreshToken };
};
