import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createPreAdvice from "./createPreAdvice";
import getPreAdvices from "./getPreAdvices";

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
      assets: Joi.array()
        .items(
          Joi.object().keys({
            productId: Joi.string().required(),
            cost: Joi.object().keys({
              currency: Joi.string().required(),
              amount: Joi.number().required(),
            }),
            expectedArrivalDate: Joi.date().required(),
            quantity: Joi.number().required(),
          })
        )
        .required(),
    },
    type: "json",
  },
  handler: createPreAdvice,
});

router.route({
  method: "get",
  path: "/",
  handler: getPreAdvices,
});

export default router;
