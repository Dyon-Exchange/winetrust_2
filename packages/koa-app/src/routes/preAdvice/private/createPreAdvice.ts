import { Request } from "koa";
import mongoose from "mongoose";

import Client from "../../../models/Client";
import PreAdvice from "../../../models/PreAdvice";
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
  const owner = await Client.findById({ _id: ownerId });
  if (!owner) {
    ctx.throw(400, "No client found");
  }

  const transferringWarehouse = await Warehouse.findById({
    _id: transferringWarehouseId,
  });
  if (!transferringWarehouse) {
    ctx.throw(400, "No transferring warehouse found");
  }

  const arrivalWarehouse = await Warehouse.findById({
    _id: arrivalWarehouseId,
  });
  if (!arrivalWarehouse) {
    ctx.throw(400, "No arrival warehouse found");
  }

  // start a mongoose session, used to revert the creation of the pre-advice and any assets if any error occurs
  const session = await mongoose.startSession();
  try {
    // start the session transaction
    session.startTransaction();

    // create the pre advice
    const newPreAdvice = await PreAdvice.create(
      [
        {
          owner,
          transferringWarehouse,
          arrivalWarehouse,
        },
      ],
      { session }
    );

    // commit and end the session
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    ctx.throw(500, "Error creating this pre advice");
  }

  ctx.status = 200;
};
