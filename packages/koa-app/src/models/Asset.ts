/* eslint-disable max-classes-per-file */
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

import { PreAdviceClass } from "./PreAdvice";
import { ProductClass } from "./Product";

// cost class, will not be turned into a model
class Cost {
  @prop({ required: true })
  public currency: string;

  @prop({ required: true })
  public amount: number;
}

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
}

export default getModelForClass(AssetClass);
