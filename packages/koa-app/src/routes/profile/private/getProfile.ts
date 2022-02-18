import { Context } from "koa";

import Profile from "../../../models/Profile";

export default async (ctx: Context) => {
  console.log("test")
  ctx.body = await Profile.find({_id:ctx.params.profileId});
};
