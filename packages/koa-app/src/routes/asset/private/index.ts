import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import getAssets from "./getAssets";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/assets");

router.route({
  method: "get",
  path: "/",
  handler: getAssets,
});

export default router;
