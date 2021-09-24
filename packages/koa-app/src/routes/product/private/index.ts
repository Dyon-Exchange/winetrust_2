import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

const router = Router();
authRequired(router);
router.prefix("/product");

export default router;
