import { Request } from "koa";
import { pick } from "lodash";

import Client from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchUsersRequest extends Request {
  query: {
    address: string;
  };
}

export default async (ctx: ExtendedContext<SearchUsersRequest>) => {
  const searchAddress = ctx.request.query.address;

  const clients = await Client.find({
    ethAddress: searchAddress,
  });

  ctx.body = clients.map(client => pick(client, ["ethAddress", "nonce"]));
};
