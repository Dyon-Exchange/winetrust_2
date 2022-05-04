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
  public simpleName: string;

  @prop({ required: true })
  public producerName: string;

  @prop({ required: true })
  public longName: string;

  @prop({ required: false })
  public productCode: number;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public year: string;

  @prop({ required: true })
  public country: string;

  @prop({ required: true })
  public region: string;

  @prop({ required: false })
  public subRegion: string;

  @prop({ required: false })
  public subSubRegion: string;

  @prop({ required: true })
  public packSize: string;

  @prop({ required: false })
  public dutyStatus: string;

  @prop({ required: true })
  public labelImage: string;

  @prop({ required: true })
  public bottleImage: string;
}

export default getModelForClass(ProductClass);
