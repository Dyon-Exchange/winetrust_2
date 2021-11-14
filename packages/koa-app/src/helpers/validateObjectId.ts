import { mongoose } from "@typegoose/typegoose";

/**
 * Validates the provided text against the mongoose ObjectId type, using the Joi custom validation format.
 * @author Aidan Kinzett
 * @param text Id to validate
 * @returns Provided value if valid
 */
const validateObjectId = (text: string) => {
  if (mongoose.Types.ObjectId.isValid(text)) return text;
  throw new Error(`${text} is not a valid mongo object id`);
};

export default validateObjectId;
