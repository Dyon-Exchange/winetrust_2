import { Context } from "koa";

import Profile from "../../../models/Profile";

export default async (ctx: Context) => {
  ctx.body = await Profile.find();
};
