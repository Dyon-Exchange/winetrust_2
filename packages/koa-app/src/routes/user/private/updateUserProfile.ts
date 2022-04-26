import multer from "@koa/multer";
import { Request } from "koa";
import { pick } from "lodash";

import getClientProfile from "../../../helpers/getClientProfile";
import uploadFileToCloudStorage from "../../../helpers/uploadFileToCloudStorage";
import Client, { ClientClass } from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface UpdateUserProfileRequest extends Request {
  file: multer.File;
  user: ClientClass;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: {
      countryCode: string;
      phoneNumber: string;
    };
  };
}

export default async (ctx: ExtendedContext<UpdateUserProfileRequest>) => {
  const profileImage = ctx.request.file;

  const updates: any = pick(ctx.request.body, [
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
  ]);

  if (profileImage) {
    const fileName = `${Date.now()}_${ctx.user.id}_${
      profileImage.originalname
    }`;
    const url = await uploadFileToCloudStorage(profileImage, fileName);
    updates.profileImage = url;
  }

  const client = await Client.findByIdAndUpdate(ctx.user.id, updates);
  ctx.body = { user: { ...getClientProfile(client), ...updates } };

  ctx.status = 200;
};
