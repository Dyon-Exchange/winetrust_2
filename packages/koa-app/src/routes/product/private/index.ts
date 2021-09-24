import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createProduct from "./createProduct";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/product");

router.route({
  method: "post",
  path: "/create",
  validate: {
    body: {},
    type: "json",
  },
  handler: createProduct,
});

export default router;
