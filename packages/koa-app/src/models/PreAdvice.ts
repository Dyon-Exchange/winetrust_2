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
import { WarehouseClass } from "./Warehouse";

enum PreAdviceState {
  DueIn = "Due In",
  PartLanded = "Part Landed",
  Landed = "Landed",
}
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class PreAdviceClass extends TimeStamps {
  @prop({ required: true, ref: () => ClientClass })
  public owner: Ref<ClientClass>;

  @prop({ required: true, ref: () => WarehouseClass })
  public transferringWarehouse: Ref<WarehouseClass>;

  @prop({ required: true, ref: () => WarehouseClass })
  public arrivalWarehouse: Ref<WarehouseClass>;

  @prop({ enum: PreAdviceState, default: PreAdviceState.DueIn })
  public state: PreAdviceState;
}

export default getModelForClass(PreAdviceClass);
