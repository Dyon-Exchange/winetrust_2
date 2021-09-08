import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import isEmail from "validator/lib/isEmail";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class WarehouseClass {
  @prop({ default: "" })
  public name: string;

  @prop({ default: "" })
  public address: string;

  @prop({ default: "" })
  public contactName: string;

  @prop({
    unique: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: "Value is not an email address.",
    },
  })
  public contactEmail?: string;
}

export default getModelForClass(WarehouseClass);
