import { Request } from "koa";

import Warehouse, { WarehouseClass } from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateWarehouseRequest extends Request {
  body: {
    warehouseName: string;
    warehouseAddress: string;
    contactName: string;
    contactEmail: string;
  };
}

export default async (ctx: ExtendedContext<CreateWarehouseRequest>) => {
  const { warehouseName, warehouseAddress, contactName, contactEmail } =
    ctx.request.body;

  await Warehouse.create({
    name: warehouseName,
    address: warehouseAddress,
    contactName,
    contactEmail,
  } as WarehouseClass);

  ctx.status = 200;
};
