/**
 * Admin model, these are the users of the application who will be able to login and use the system
 */

import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { hashSync } from "bcrypt";
import isEmail from "validator/lib/isEmail";

// cost factor that controls how much time is needed to calculate a single bcrypt hash
// leave this at 12... trust
const saltRounds = 12;

// pre hook, hash password on save
@pre<AdminClass>("save", function preSaveHook(next) {
  // can't use arrow function here, 'this' will not bind if arrow function is used
  if (this.isModified("password")) {
    this.password = hashSync(this.password, saltRounds);
  }

  next();
})
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class AdminClass extends TimeStamps {
  @prop({
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: "Value is not an email address.",
    },
  })
  public email: string;

  @prop({ required: true })
  public password!: string;
}

export default getModelForClass(AdminClass);
