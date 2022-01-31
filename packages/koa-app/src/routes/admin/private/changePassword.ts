import { hashSync } from "bcrypt";
import { decode } from "jsonwebtoken";
import { Request } from "koa";

import Admin, { AdminClass } from "../../../models/Admin";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface ChangePasswordRequest extends Request {
  body: {
    password: string;
  };
}

export default async (ctx: ExtendedContext<ChangePasswordRequest>) => {
  const { password } = ctx.request.body;
  const token = ctx.headers.authorization.split(" ")[1];
  const id : string = decode(token)["id"];
  const saltRounds = 12;

  await Admin.findOneAndUpdate({_id:id},{password:hashSync(password, saltRounds)})

  ctx.status = 200;
};
