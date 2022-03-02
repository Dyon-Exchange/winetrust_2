import { mongoose } from "@typegoose/typegoose";
import { Context } from "koa";
import { isInteger, toInteger } from "lodash";

// import asset from "..";
import Asset from "../../../models/Asset";

export default async (ctx: Context) => {
  // ctx.body = ctx.request.params
  const { type, searchtext } = ctx.request.params;

  let $find: any = [];

  try {
    $find = { _id: new mongoose.Types.ObjectId(searchtext) };
  } catch (err) {
    $find = { longName: searchtext };
  }

  const assets: any = await Asset.find($find)
    .populate({
      path: "product",
    })
    .populate({
      path: "preAdvice",
      populate: {
        path: "owner",
      },
    });

  ctx.body = $find.longName
    ? assets.filter((asset) =>
        asset.product.longName
          .toLocaleLowerCase()
          .includes(searchtext.replace(/%20/g, " ").toLocaleLowerCase())
      )
    : assets;
};
