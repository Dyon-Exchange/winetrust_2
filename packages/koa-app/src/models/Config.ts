/* eslint-disable max-classes-per-file */
/**
 * Client model, clients who own the wine/token assets, they do not use this system
 */

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class ConfigClass extends TimeStamps {
  @prop({
    required: true,
    unique: true,
  })
  public key: string;

  @prop()
  public value?: number;
}

export default getModelForClass(ConfigClass);
