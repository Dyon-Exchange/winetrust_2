import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { hashSync } from "bcrypt";
import isEmail from "validator/lib/isEmail";

const salt = 24; // mamba out

// cannot use arrow function here, 'this' will not bind if arrow function
// eslint-disable-next-line func-names
@pre<Admin>("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, salt);
  }

  next();
})
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
class Admin {
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

export default getModelForClass(Admin);
