import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createClient from "./createClient";
import getClients from "./getClients";
import searchClients from "./searchClients";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/clients");

router.route({
  method: "post",
  path: "/",
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

router.route({
  method: "get",
  path: "/",
  handler: getClients,
});

router.route({
  method: "get",
  path: "/search",
  validate: {
    query: {
      name: Joi.string().required(),
    },
  },
  handler: searchClients,
});

export default router;
