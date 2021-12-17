import { Context } from "koa";

import Assets, { AssetClass } from "../../../models/Asset";
import Product, { ProductClass } from "../../../models/Product";

interface ProductBody {
  ids: string[];
}

export default async (ctx: Context) => {
  const { ids }: ProductBody = JSON.parse(ctx.request.body);

  if (!ids) {
    ctx.body = {
      err: `Invalid Product Id format: ${ids}`,
    };
    ctx.status = 400;
    return;
  }

  const assets = await Assets.find().populate({
    path: "product",
  });

  await Product.deleteMany({
    _id: ids.filter((id) => {
      const asset: AssetClass = assets.find((a) => {
        const prod = a.product as ProductClass & {
          id: any;
        };
        return prod?.id === id;
      });

      return !asset;
    }),
  });

  ctx.body = { res: await Product.find() };
};
