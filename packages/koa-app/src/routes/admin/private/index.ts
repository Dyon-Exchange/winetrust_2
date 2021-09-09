import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

const router = Router();
authRequired(router);
router.use(async (ctx, next) => {
  if (ctx.state.user.constructor.modelName === "AdminClass") {
    return next();
  }

  return ctx.throw(403, "Forbidden");
});

router.prefix("/admin");

export default router;
