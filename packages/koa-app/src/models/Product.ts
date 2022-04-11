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
  public region: string;

  @prop({ required: true })
  public subRegion: string;

  @prop({ required: false })
  public subSubRegion: string;

  @prop({ required: true })
  public packSize: string;

  @prop({ required: false })
  public dutyStatus: string;

  @prop({ required: false })
  public image: string;

  @prop({ required: true })
  public labelImage: string;

  @prop({ required: false })
  public labelImage2: string;

  @prop({ required: false })
  public bottleImage: string;

  @prop({ required: false })
  public bottleImage2: string;

  @prop({ required: false })
  public marketingImage1: string;

  @prop({ required: false })
  public marketingImage2: string;

  @prop({ required: false })
  public marketingImage3: string;

  @prop({ required: false })
  public marketingImage4: string;
}

export default getModelForClass(ProductClass);
