import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

const { Joi } = Router;

const router = Router();
authRequired(router);

router.prefix("/pre-advice");

export default router;
