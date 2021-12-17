import { Context } from "koa";

import Assets, { AssetClass } from "../../../models/Asset";
import { PreAdviceClass } from "../../../models/PreAdvice";
import Warehouse, { WarehouseClass } from "../../../models/Warehouse";

interface WarehouseBody {
  ids: string[];
}

export default async (ctx: Context) => {
  const { ids }: WarehouseBody = JSON.parse(ctx.request.body);

  if (!ids) {
    ctx.body = {
      err: `Invalid Warehouse Id format: ${ids}`,
    };
    ctx.status = 400;
    return;
  }

  const assets = await Assets.find().populate({
    path: "preAdvice",
    populate: {
      path: "arrivalWarehouse",
    },
  });

  await Warehouse.deleteMany({
    _id: ids.filter((id) => {
      const asset: AssetClass = assets.find((a) => {
        const preAd = a.preAdvice as PreAdviceClass;

        const arrwarehouse = preAd?.arrivalWarehouse as WarehouseClass & {
          id: any;
        };
        const trnwarehouse = preAd?.transferringWarehouse as WarehouseClass & {
          id: any;
        };

        return arrwarehouse?.id === id || trnwarehouse?.id === id;
      });

      return !asset;
    }),
  });

  ctx.body = { res: await Warehouse.find() };
};
