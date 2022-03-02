import * as sigUtil from "@metamask/eth-sig-util";
import * as ethUtil from "ethereumjs-util";
import { sign } from "jsonwebtoken";
import { Request } from "koa";

import Client from "../../../models/Client";
import ExtendedContext from "../../../types/koa/ExtendedContext";

interface AuthRequest extends Request {
  body: {
    address: string;
    signature: string;
  };
}

export default async (ctx: ExtendedContext<AuthRequest>) => {
  const { address, signature } = ctx.request.body;

  const client = await Client.findOne({ ethAddress: address });

  if (!client) {
    ctx.throw(404, "User not found.");
  }

  const msg = `I am signing my one-time nonce: ${client.nonce}`;

  const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, "utf8"));
  const rAddress = sigUtil.recoverPersonalSignature({
    data: msgBufferHex,
    signature
  });

  if (address.toLowerCase() !== rAddress.toLowerCase()) {
    ctx.throw(401, "Signature verification failed");
  }

  client.nonce = Math.floor(Math.random() * 1000000);
  await client.save();

  const payload = {
    id: client._id,
    address,
  };

  const token = sign(payload, process.env.TOKEN_SECRET);

  ctx.body = { token };
};
