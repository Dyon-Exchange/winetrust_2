import { Context, DefaultState } from "koa";
import Router from "koa-router";

import AdminRouter from "./admin";
import AssetRouter from "./asset";
import ClientRouter from "./client";
import PreAdviceRouter from "./preAdvice";
import ProductRouter from "./product";
import TokenRouter from "./token";
import WarehouseRouter from "./warehouse";

const router = new Router<DefaultState, Context>();

router.get("/", async (ctx: Context) => {
  ctx.body =
    "Welcome to the WineTrust inventory management system Koa application!";
});

router.use(
  AdminRouter.Public.middleware(),
  AdminRouter.Private.middleware(),
  AssetRouter.Public.middleware(),
  AssetRouter.Private.middleware(),
  ClientRouter.Public.middleware(),
  ClientRouter.Private.middleware(),
  PreAdviceRouter.Public.middleware(),
  PreAdviceRouter.Private.middleware(),
  ProductRouter.Public.middleware(),
  ProductRouter.Private.middleware(),
  TokenRouter.Public.middleware(),
  TokenRouter.Private.middleware(),
  WarehouseRouter.Public.middleware(),
  WarehouseRouter.Private.middleware()
);

export default router;
