import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import isEthereumAddress from "validator/lib/isEthereumAddress";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class ClientClass {
  @prop({ default: "" })
  public firstName: string;

  @prop({ default: "" })
  public lastName: string;

  @prop({
    validate: {
      validator: (address: string) => isEthereumAddress(address),
      message: "Value is not an ethereum address.",
    },
  })
  public ethAddress?: string;

  @prop({ unique: true })
  public phoneNumber?: string;
}

export default getModelForClass(ClientClass);
