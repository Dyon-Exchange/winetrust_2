import Router from "koa-joi-router";

import { adminAuthRequired } from "../../../services/passport";

const router = Router();
adminAuthRequired(router);
router.prefix("/tokens");

export default router;
