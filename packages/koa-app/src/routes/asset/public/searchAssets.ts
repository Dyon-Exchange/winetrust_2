import { mongoose } from "@typegoose/typegoose";
import { Request } from "koa";
import { isInteger, toInteger } from "lodash";

// import asset from "..";
import Asset from "../../../models/Asset";
import Product from "../../../models/Product";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchAssetsRequest extends Request {
  query: {
    "query": string;
  };
}

export default async (ctx: ExtendedContext<SearchAssetsRequest>) => {
  // ctx.body = ctx.request.params
  const { query: searchText } = ctx.request.query;

  const products = await Product.find({ longName: { $regex: searchText, $options: "i" } });
  const productIds = products.map(doc => doc._id);
  const $filter = {
    $or: [
      { assetId: { $regex: searchText, $options: "i" } },
      { product: { $in: productIds } },
    ],
    tokenisedAt: { $ne: null }
  };

  const assets: any = await Asset.find($filter)
    .populate({
      path: "product",
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "owner",
        select: "ethAddress firstName lastName profileImage",
      },
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "arrivalWarehouse",
      },
    });

  ctx.body = assets;
};
