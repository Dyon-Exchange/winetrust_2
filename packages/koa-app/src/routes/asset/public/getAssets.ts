import { mongoose } from "@typegoose/typegoose";
import { Context } from "koa";
import { isInteger, toInteger } from "lodash";

// import asset from "..";
import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  // ctx.body = ctx.request.params
  const {type,searchtext} = ctx.request['params'];
  let assets: any;
  if (type === "token") {

    const tokenId : number = +searchtext
    assets = await Asset.find({ tokenId: tokenId });
    ctx.body = assets;
  }
  if (type === "product") {
    assets = await Asset.find({ simpleName: searchtext }).populate({
      path: "product"

    });
    ctx.body = assets.filter((asset) => asset.product.simpleName.includes(searchtext.replace(/%20/g, " ")));
    console.log(ctx.body)
  }
};
