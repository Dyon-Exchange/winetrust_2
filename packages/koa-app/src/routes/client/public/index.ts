import Router from "koa-joi-router";

import createClient from "../private/createClient";

const router = Router();
const { Joi } = Router;

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
export default router;
