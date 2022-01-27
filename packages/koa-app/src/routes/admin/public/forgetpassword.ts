
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request } from "koa";

import Admin, { AdminClass } from "../../../models/Admin";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface ForgetPassword extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default async (ctx: ExtendedContext<ForgetPassword>) => {
  const { email } = ctx.request.body;

  const account = await Admin.findOne({ email });
  if (account === undefined || account === null) {
    ctx.throw(404, "Account not found.");
  }

  const payload = {
    id: account._id,
  };

  const token = sign(payload, process.env.TOKEN_SECRET, { expiresIn: 36000 });
  console.log(token)
  // const refreshToken = sign(payload, process.env.REFRESH_SECRET, {
  //   expiresIn: "7d",
  // });

  ctx.body = { status: "Password reset sent successfully." };
};

