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
 export class ProfileClass extends TimeStamps {
   @prop()
   public chainId?: string;
 
   @prop()
   public walletAddress?: string;
 
   @prop({
     validate: {
       validator: (email: string) => isEmail(email),
       message: "Value is not an email address.",
     },
   })
   public email?: string;
 }
 
 export default getModelForClass(ProfileClass);
 