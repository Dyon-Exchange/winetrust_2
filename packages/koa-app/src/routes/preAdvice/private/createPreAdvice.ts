import { Request } from "koa";
import mongoose from "mongoose";

import Asset from "../../../models/Asset";
import Client from "../../../models/Client";
import PreAdvice from "../../../models/PreAdvice";
import Product from "../../../models/Product";
import Warehouse from "../../../models/Warehouse";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface AssetForm {
  productId: string;
  cost: {
    currency: string;
    amount: number;
  };
  expectedArrivalDate: Date;
  quantity: number;
}

interface CreatePreAdviceRequest extends Request {
  body: {
    ownerId: string;
    transferringWarehouseId: string;
    arrivalWarehouseId: string;
    assets: AssetForm[];
  };
}

export default async (ctx: ExtendedContext<CreatePreAdviceRequest>) => {
  const { ownerId, transferringWarehouseId, arrivalWarehouseId, assets } =
    ctx.request.body;

  // get the owner, transferring warehouse and arrival warehouse documents and check they exist
  const owner = await Client.findById(ownerId);
  if (!owner) {
    ctx.throw(400, "No client found");
  }

  const transferringWarehouse = await Warehouse.findById(
    transferringWarehouseId
  );
  if (!transferringWarehouse) {
    ctx.throw(400, "No transferring warehouse found");
  }

  const arrivalWarehouse = await Warehouse.findById(arrivalWarehouseId);
  if (!arrivalWarehouse) {
    ctx.throw(400, "No arrival warehouse found");
  }

  // start a mongoose session, used to revert the creation of the pre-advice and any assets if any error occurs
  const session = await mongoose.startSession();
  try {
    // start the session transaction
    session.startTransaction();

    // create the pre-advice, will return an array, pull the pre-advice object out of the array
    const [preAdvice] = await PreAdvice.create(
      [
        {
          owner,
          transferringWarehouse,
          arrivalWarehouse,
        },
      ],
      { session }
    );

    // loop through assets and create the assets linking them to this pre-advice
    await Promise.all(
      assets.map(async (asset) => {
        // get the product for this asset
        const product = await Product.findById(asset.productId, null, {
          session,
        });

        if (!product) {
          throw new Error("No product found");
        }

        // create an array with length asset.quantity of the asset
        const formattedAssets = new Array(asset.quantity).fill(0).map(() => ({
          preAdvice,
          product,
          cost: asset.cost,
          expectedArrivalDate: asset.expectedArrivalDate,
        }));

        // create the asset/s in the db
        await Asset.insertMany(formattedAssets, { session });
      })
    );

    // commit and end the session
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    ctx.throw(500, "Error creating this pre-advice");
  }

  ctx.status = 200;
};
