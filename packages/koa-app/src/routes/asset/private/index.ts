import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/assets");

export default router;
