import { mongoose } from "@typegoose/typegoose";
import { Request } from "koa";
import { isInteger, toInteger } from "lodash";

// import asset from "..";
import Asset from "../../../models/Asset";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface SearchAssetsRequest extends Request {
  query: {
    "query": string;
  };
}

export default async (ctx: ExtendedContext<SearchAssetsRequest>) => {
  // ctx.body = ctx.request.params
  const { query: searchText } = ctx.request.query;

  let $find: any = [];

  try {
    $find = { _id: new mongoose.Types.ObjectId(searchText) };
  } catch (err) {
    $find = { longName: searchText };
  }

  const assets: any = await Asset.find($find)
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

  ctx.body = $find.longName
    ? assets.filter((asset) =>
      asset.product.longName
        .toLocaleLowerCase()
        .includes(searchText.replace(/%20/g, " ").toLocaleLowerCase())
    )
    : assets;
};
