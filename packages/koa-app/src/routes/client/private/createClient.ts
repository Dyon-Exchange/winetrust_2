import { Context } from "koa";

import Client, { ClientClass } from "../../../models/Client";

interface CreateClientRequestBody {
  firstName: string;
  lastName: string;
  ethAddress: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
}

export default async (ctx: Context) => {
  const { firstName, lastName, ethAddress, phoneNumber } = ctx.request
    .body as CreateClientRequestBody;

  console.log({ firstName });
  console.log({ lastName });
  console.log({ ethAddress });
  console.log({ phoneNumber });

  ctx.status = 200;
};
