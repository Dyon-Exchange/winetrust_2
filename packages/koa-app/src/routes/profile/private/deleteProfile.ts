import { Context } from "koa";

import Profile from "../../../models/Profile";

export default async (ctx: Context) => {
  await Profile.findByIdAndRemove(ctx.params.profileId);

  ctx.status = 200;
};
