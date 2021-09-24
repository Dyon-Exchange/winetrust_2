import { Context } from "koa";
import Router from "koa-joi-router";

import AdminRouter from "./admin";
import TokenRouter from "./token";
import WarehouseRouter from "./warehouse";

const router = Router();

router.get("/", async (ctx: Context) => {
  ctx.body =
    "Welcome to the WineTrust inventory management system Koa application!";
});

router.use(
  AdminRouter.Public.middleware(),
  AdminRouter.Private.middleware(),
  TokenRouter.Public.middleware(),
  TokenRouter.Private.middleware(),
  WarehouseRouter.Public.middleware(),
  WarehouseRouter.Private.middleware()
);

export default router;
