import { Context } from "koa";
import Router from "koa-joi-router";

const router = Router();

router.get("/", async (ctx: Context) => {
  ctx.body =
    "Welcome to the WineTrust inventory management system Koa application!";
});

export default router;
