import { Request } from "koa";
import { pick } from "lodash";

import Client, { ClientClass } from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateClientRequest extends Request {
  body: {
    address: string;
  };
}

export default async (ctx: ExtendedContext<CreateClientRequest>) => {
  const { address: ethAddress } = ctx.request.body;

  let user = await Client.findOne({ ethAddress });

  if (user === undefined || user === null) {
    user = await Client.create({
      ethAddress,
    } as ClientClass);
  }

  ctx.body = pick(user, ["ethAddress", "nonce"]);
  ctx.status = 200;
};
