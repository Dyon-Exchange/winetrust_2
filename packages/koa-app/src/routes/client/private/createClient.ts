import { Request } from "koa";

import Client, { ClientClass } from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateClientRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    ethAddress: string;
    phoneNumber: {
      countryCode: string;
      phoneNumber: string;
    };
  };
}

export default async (ctx: ExtendedContext<CreateClientRequest>) => {
  const { firstName, lastName, ethAddress, phoneNumber } = ctx.request.body;

  await Client.create({
    firstName,
    lastName,
    ethAddress,
    phoneNumber,
  } as ClientClass);

  ctx.status = 200;
};
