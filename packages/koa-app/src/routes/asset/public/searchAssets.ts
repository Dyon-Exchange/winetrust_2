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

  const $filter = {
    $or: [
      { assetId: { $regex: searchText, $options: "i" } },
      { longName: { $regex: searchText, $options: "i" } },
    ],
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
