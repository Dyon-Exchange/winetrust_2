import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createClient from "./createClient";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/client");

router.route({
  method: "post",
  path: "/create",
  validate: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      ethAddress: Joi.string().required(),
      phoneNumber: {
        countryCode: Joi.string().required(),
        phoneNumber: Joi.string().required(),
      },
    },
    type: "json",
  },
  handler: createClient,
});

export default router;
