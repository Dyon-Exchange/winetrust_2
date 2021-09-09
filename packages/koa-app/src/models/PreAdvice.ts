/**
 * Pre advice model, invoice like model which is used to create new assets
 */

import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ClientClass } from "./Client";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class PreAdviceClass extends TimeStamps {
  @prop({ required: true, unique: true })
  public preAdviceId: string;

  @prop({ required: true, ref: "ClientClass" })
  public transferrer: Ref<ClientClass>;
}

export default getModelForClass(PreAdviceClass);
