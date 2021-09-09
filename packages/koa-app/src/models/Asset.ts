/**
 * Asset model, the individual wine/token asset which is a type of product
 */

import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ClientClass } from "./Client";
import { PreAdviceClass } from "./PreAdvice";
import { ProductClass } from "./Product";
import { WarehouseClass } from "./Warehouse";

enum AssetState {
  DueIn = "Due In",
  Landed = "Landed",
  Tokenised = "Tokenised",
}

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class AssetClass extends TimeStamps {
  @prop({ required: true, unique: true })
  public assetId: string;

  @prop({ required: true, ref: "PreAdviceClass" })
  public preAdvice: Ref<PreAdviceClass>;

  @prop({ required: true, ref: "ProductClass" })
  public product: Ref<ProductClass>;

  @prop({ required: true, ref: "ClientClass" })
  public owner: Ref<ClientClass>;

  @prop({ required: true, ref: "WarehouseClass" })
  public warehouse: Ref<WarehouseClass>;

  @prop({ enum: AssetState, default: AssetState.DueIn })
  public state?: AssetState;
}

export default getModelForClass(AssetClass);
