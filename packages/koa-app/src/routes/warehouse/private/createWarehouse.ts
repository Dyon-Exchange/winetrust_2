import { Context } from "koa";

import Warehouse, { WarehouseClass } from "../../../models/Warehouse";

interface CreateWarehouseRequestBody {
  warehouseName: string;
  warehouseAddress: string;
  contactName: string;
  contactEmail: string;
}

export default async (ctx: Context) => {
  const { warehouseName, warehouseAddress, contactName, contactEmail } = ctx
    .request.body as CreateWarehouseRequestBody;

  await Warehouse.create({
    name: warehouseName,
    address: warehouseAddress,
    contactName,
    contactEmail,
  } as WarehouseClass);

  ctx.status = 200;
};
