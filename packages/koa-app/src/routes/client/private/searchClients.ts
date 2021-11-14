import { Request } from "koa";

import Client from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchClientsRequest extends Request {
  query: {
    name: string;
  };
}

export default async (ctx: ExtendedContext<SearchClientsRequest>) => {
  const searchName = ctx.request.query.name;

  if (searchName === "") {
    ctx.body = await Client.find();
    return;
  }

  ctx.body = await Client.find({
    $or: [
      { firstName: { $regex: searchName, $options: "i" } },
      { lastName: { $regex: searchName, $options: "i" } },
    ],
  });
};
