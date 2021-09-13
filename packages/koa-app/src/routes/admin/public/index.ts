import Router from "koa-joi-router";

import login from "./login";

const { Joi } = Router;

const router = Router();
router.prefix("/admin");

router.route({
  method: "post",
  path: "/login",
  validate: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    type: "json",
    output: {
      200: {
        body: {
          token: Joi.string().required(),
          refreshToken: Joi.string().required(),
        },
      },
    },
  },
  handler: login,
});

export default router;
