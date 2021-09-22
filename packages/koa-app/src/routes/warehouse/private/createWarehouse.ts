import { Context } from "koa";

import Warehouse from "../../../models/Warehouse";

interface CreateWarehouseRequestBody {
  warehouseName: string;
  warehouseAddress: string;
  contactName: string;
  contactEmail: string;
}

export default async (ctx: Context) => {
  const requestBody = ctx.request.body as CreateWarehouseRequestBody;

  console.log(requestBody);

  ctx.body = {};
};
