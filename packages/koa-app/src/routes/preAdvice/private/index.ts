import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createPreAdvice from "./createPreAdvice";

const { Joi } = Router;

const router = Router();
authRequired(router);

router.prefix("/pre-advice");

router.route({
  method: "post",
  path: "/",
  validate: {
    body: {
      ownerId: Joi.string().required(),
      transferringWarehouseId: Joi.string().required(),
      arrivalWarehouseId: Joi.string().required(),
    },
    type: "json",
  },
  handler: createPreAdvice,
});

export default router;
