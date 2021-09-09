/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
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
import { ProductClass } from "./Product";
import { WarehouseClass } from "./Warehouse";

enum AssetState {
  DUE_IN = "Due In",
  LANDED = "Landed",
  TOKENISED = "Tokenised",
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

  @prop({ required: true, ref: "ProductClass" })
  public product: Ref<ProductClass>;

  @prop({ required: true, ref: "ClientClass" })
  public owner: Ref<ClientClass>;

  @prop({ required: true, ref: "WarehouseClass" })
  public warehouse: Ref<WarehouseClass>;

  @prop({ enum: AssetState, default: AssetState.DUE_IN })
  public state?: AssetState;

  // TODO: add the reference to the pre-advice
}

export default getModelForClass(AssetClass);
