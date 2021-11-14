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
  @prop({ required: true })
  public productName: string;

  @prop({ required: true })
  public description: string;

  // @prop({ maxlength: 18, required: true })
  // public skuCode?: string;

  @prop({ required: true })
  public year: string;

  @prop({ required: true })
  public region: string;

  @prop({ required: true })
  public subRegion: string;

  @prop({ required: true })
  public subSubRegion: string;

  @prop({ required: true })
  public packSize: string;

  @prop({ required: true })
  public dutyStatus: string;

  @prop({ required: true })
  public image: string;
}

export default getModelForClass(ProductClass);
