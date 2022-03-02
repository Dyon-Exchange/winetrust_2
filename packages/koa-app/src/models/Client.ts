/* eslint-disable max-classes-per-file */
/**
 * Client model, clients who own the wine/token assets, they do not use this system
 */

import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import isEthereumAddress from "validator/lib/isEthereumAddress";

// phone number class, will not be turned into a model
class PhoneNumber {
  @prop()
  public countryCode?: string;

  @prop()
  public phoneNumber?: string;
}

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class ClientClass extends TimeStamps {
  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop({
    required: true,
    unique: true,
    validate: {
      validator: (address: string) => isEthereumAddress(address),
      message: "Value is not an ethereum address.",
    },
  })
  public ethAddress!: string;

  @prop()
  public phoneNumber?: PhoneNumber;

  @prop({
    default: () => Math.floor(Math.random() * 1000000),
  })
  public nonce?: number;
}

export default getModelForClass(ClientClass);
