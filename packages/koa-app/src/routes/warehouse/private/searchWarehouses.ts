import { Request } from "koa";

import Warehouse from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchWarehousesRequest extends Request {
  query: {
    name: string;
  };
}

export default async (ctx: ExtendedContext<SearchWarehousesRequest>) => {
  const searchName = ctx.request.query.name;

  if (searchName === "") {
    ctx.body = [];
    return;
  }

  ctx.body = await Warehouse.find({
    name: { $regex: searchName, $options: "i" },
  });
};
