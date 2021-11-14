import { Context } from "koa";

import Client, { ClientClass } from "../../../models/Client";
import Assets from "../../../models/Asset";
import { PreAdviceClass } from "../../../models/PreAdvice";

interface ClientBody {
  ids: string[];
}

export default async (ctx: Context) => {
  const { ids }: ClientBody = JSON.parse(ctx.request.body);

  if (!ids) {
    ctx.body = {
      err: `Invalid Client Id format: ${ids}`,
    };
    ctx.status = 400;
    return;
  }

  const assets = await Assets.find().populate({
    path: "preAdvice",
    populate: {
      path: "owner",
    },
  });

  await Client.deleteMany({
    _id: ids.filter(
      (id) =>
        !assets.some((a) => {
          const preAd = a.preAdvice as PreAdviceClass;
          return (
            (
              preAd?.owner as ClientClass & {
                id: any;
              }
            )?.id === id
          );
        })
    ),
  });

  ctx.body = {
    res: await Client.find(),
  };
};
