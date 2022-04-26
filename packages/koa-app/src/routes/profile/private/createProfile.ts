import { Request } from "koa";

import Profile, { ProfileClass } from "../../../models/Profile";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateProfileRequest extends Request {
  body: {
    chainId: string;
    walletAddress: string;
    email: string;
  };
}

export default async (ctx: ExtendedContext<CreateProfileRequest>) => {
  const { chainId, walletAddress, email } = ctx.request.body;

  await Profile.create({
    chainId,
    walletAddress,
    email
  } as ProfileClass);

  ctx.status = 200;
};
