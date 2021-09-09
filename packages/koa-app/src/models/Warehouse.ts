/**
 * Warehouse model, the warehouses storing assets for the WineTrust network
 */

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import isEmail from "validator/lib/isEmail";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class WarehouseClass extends TimeStamps {
  @prop()
  public name?: string;

  @prop()
  public address?: string;

  @prop()
  public contactName?: string;

  @prop({
    validate: {
      validator: (email: string) => isEmail(email),
      message: "Value is not an email address.",
    },
  })
  public contactEmail?: string;
}

export default getModelForClass(WarehouseClass);
