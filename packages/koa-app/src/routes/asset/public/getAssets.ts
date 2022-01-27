import { mongoose } from "@typegoose/typegoose";
import { Context } from "koa";
import { toInteger } from "lodash";

// import asset from "..";
import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  // ctx.body = ctx.request.params
  const {type} = ctx.request.params;
  const {id} = ctx.request.params;
  let assets: any;
  if (type === "token") {
    assets = await Asset.find({ tokenId: id });
    ctx.body = assets;
  }
  if (type === "product") {
    assets = await Asset.find({ productname: id }).populate({
      path: "product",
      match: {
        productName:id
      }
    });
    ctx.body = assets.filter((asset) => asset.product);
    console.log(ctx.body)
  }
};
