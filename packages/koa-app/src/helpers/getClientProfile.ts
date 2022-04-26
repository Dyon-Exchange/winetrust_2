import { pick } from "lodash";
import { Document } from "mongoose";

export default function getClientProfile(client: Document) {
  return pick(client.toObject(), ["firstName", "lastName", "email", "phoneNumber.countryCode", "phoneNumber.phoneNumber", "profileImage"])
}
