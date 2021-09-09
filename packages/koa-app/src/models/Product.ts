/**
 * Product model, description classes for assets, assets are unique instances of a product
 */

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class ProductClass extends TimeStamps {
  @prop()
  public productName?: string;

  @prop({ maxlength: 18 })
  public skuCode?: string;

  @prop()
  public year?: string;

  @prop()
  public region?: string;

  @prop()
  public subRegion?: string;

  @prop()
  public subSubRegion?: string;

  @prop()
  public packSize?: string;

  @prop()
  public dutyStatus?: string;

  @prop()
  public image?: string;
}

export default getModelForClass(ProductClass);
