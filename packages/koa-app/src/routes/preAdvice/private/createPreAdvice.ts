import { Request } from "koa";

import Client from "../../../models/Client";
import Warehouse from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreatePreAdviceRequest extends Request {
  body: {
    ownerId: string;
    transferringWarehouseId: string;
    arrivalWarehouseId: string;
  };
}

export default async (ctx: ExtendedContext<CreatePreAdviceRequest>) => {
  const { ownerId, transferringWarehouseId, arrivalWarehouseId } =
    ctx.request.body;

  // get the owner, transferring warehouse and arrival warehouse documents and check they exist
  const owner = await Client.find({ _id: ownerId });
  if (!owner) {
    ctx.throw(400, "No client found");
  }

  const transferringWarehouse = await Warehouse.find({
    _id: transferringWarehouseId,
  });
  if (!transferringWarehouse) {
    ctx.throw(400, "No transferring warehouse found");
  }

  const arrivalWarehouse = await Warehouse.find({ _id: arrivalWarehouseId });
  if (!arrivalWarehouse) {
    ctx.throw(400, "No arrival warehouse found");
  }

  console.log({ owner });
  console.log({ transferringWarehouse });
  console.log({ arrivalWarehouse });

  ctx.status = 200;
};
