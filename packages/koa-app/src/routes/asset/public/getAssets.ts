import { mongoose } from "@typegoose/typegoose";
import { Context } from "koa";
import { toInteger } from "lodash";
import asset from "..";

import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  // ctx.body = ctx.request.params
  const type: string = ctx.request["params"]["type"];
  const id: any = ctx.request["params"]["id"];
  let assets: any;
  if (type === "token") {
    assets = await Asset.find({ tokenId: id });
    ctx.body = assets;
  }
  if (type === "product") {
    assets = await Asset.find().populate({
      path: "product",
      match: {
        productId:id
      }
    });
    ctx.body = assets.filter(function(asset) {
      return asset.product;
    });
    console.log(ctx.body)
  }
};
