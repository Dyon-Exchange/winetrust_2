import { Request } from "koa";

import Product from "../../../models/Product";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchProductsRequest extends Request {
  query: {
    ["product-name"]: string;
  };
}

export default async (ctx: ExtendedContext<SearchProductsRequest>) => {
  const searchName = ctx.request.query["product-name"];

  if (searchName === "") {
    ctx.body = [];
    return;
  }

  ctx.body = await Product.find({
    productName: { $regex: searchName, $options: "i" },
  });
};
