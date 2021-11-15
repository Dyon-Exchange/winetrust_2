import { Context } from "koa";

import Product, { ProductClass } from "../../../models/Product";
import Assets from "../../../models/Asset";

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
    _id: ids.filter(
      (id) =>
        !assets.some((a) => {
          const prod = a.product as ProductClass & {
            id: any;
          };
          return prod?.id === id;
        })
    ),
  });

  ctx.body = { res: await Product.find() };
};
