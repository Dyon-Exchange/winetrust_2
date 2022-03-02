import { Request } from "koa";
import { pick } from "lodash";

import Client, { ClientClass } from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface UpdateUserProfileRequest extends Request {
  user: ClientClass,
  body: {
    firstName: string;
    lastName: string;
    phoneNumber: {
      countryCode: string;
      phoneNumber: string;
    };
  };
}

export default async (ctx: ExtendedContext<UpdateUserProfileRequest>) => {
  const updates = pick(ctx.request.body, ["firstName", "lastName", "phoneNumber"]);

  await Client.findByIdAndUpdate(ctx.user.id, updates);

  ctx.status = 200;
};
