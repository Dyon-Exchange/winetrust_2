import { Context } from "koa";
import Router from "koa-joi-router";

import AdminRouter from "./admin";

const router = Router();

router.get("/", async (ctx: Context) => {
  ctx.body =
    "Welcome to the WineTrust inventory management system Koa application!";
});

router.use(AdminRouter.Public.middleware(), AdminRouter.Private.middleware());

export default router;
