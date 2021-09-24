import { Request } from "koa";

import ExtendedContext from "../../../types/koa/ExtendedContext";

interface CreateProductRequest extends Request {
  body: {
    productName: string;
    year: string;
    region: string;
    subRegion?: string;
    subSubRegion?: string;
    packSize: string;
    dutyStatus: string;
    image: FormData;
  };
}

export default async (ctx: ExtendedContext<CreateProductRequest>) => {
  ctx.status = 200;
};
