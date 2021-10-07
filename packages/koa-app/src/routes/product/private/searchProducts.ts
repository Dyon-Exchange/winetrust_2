import { Request } from "koa";

import Product from "../../../models/Product";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchProductsRequest extends Request {
  query: {
    productName: string;
  };
}

export default async (ctx: ExtendedContext<SearchProductsRequest>) => {
  const searchName = ctx.request.query.productName;

  if (searchName === "") {
    ctx.body = [];
    return;
  }

  ctx.body = await Product.find({
    productName: { $regex: searchName, $options: "i" },
  });
};
