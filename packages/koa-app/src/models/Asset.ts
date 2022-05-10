/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/**
 * Asset model, the individual wine/token asset which is a type of product
 */

import { AutoIncrementID } from "@typegoose/auto-increment";
import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { AutoIncrementAssetID } from "../plugins/autoIncrementAssetId";

import { PreAdviceClass } from "./PreAdvice";
import { ProductClass } from "./Product";

// cost class, will not be turned into a model
class Cost {
  @prop({ required: true })
  public currency: string;

  @prop({ required: true })
  public amount: number;
}

export enum AssetState {
  DueIn = "Due In",
  Landed = "Landed",
  Tokenised = "Tokenised",
  Redeemed = "Redeemed",
}

@plugin(AutoIncrementAssetID)
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class AssetClass extends TimeStamps {
  @prop({ unique: true })
  public assetId: string;

  @prop({ required: true, ref: () => PreAdviceClass })
  public preAdvice: Ref<PreAdviceClass>;

  @prop({ required: true, ref: () => ProductClass })
  public product: Ref<ProductClass>;

  @prop({ required: true })
  public cost: Cost;

  @prop({ required: true })
  public expectedArrivalDate: Date;

  @prop({ enum: AssetState, default: AssetState.DueIn })
  public state: AssetState;


  @prop()
  public initialConditionText: string;

  // The IPFS hash of the condition report
  @prop()
  public initialConditionReport: string;

  @prop()
  public initialConditionReport2: string;

  @prop()
  public initialConditionReport3: string;

  @prop()
  public initialConditionReport4: string;

  @prop()
  public initialConditionReport5: string;

  @prop()
  public initialConditionReport6: string;

  @prop()
  public metadataHash: string;

  @prop()
  public tokenId: number;

  @prop()
  public txHash: string;

  @prop()
  public warehouseLocationNo: string;

  @prop()
  public landedAt: Date;

  @prop()
  public tokenisedAt: Date;

  @prop()
  public externalMarketingImage: string;

  @prop()
  public internalMarketingImage: string;

  @prop()
  public externalURL: string;
}

const Asset = getModelForClass(AssetClass);

export default Asset;
