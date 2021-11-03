import Router from "koa-joi-router";

import login from "./login";
import refreshToken from "./refreshToken";
import signup from "./signup";

const { Joi } = Router;

const router = Router();
router.prefix("/admins");

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

router.route({
  method: "post",
  path: "/refresh",
  validate: {
    body: {
      refreshToken: Joi.string().required(),
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
  handler: refreshToken,
});

router.route({
  method: "post",
  path: "/signup",
  validate: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    type: "json",
    output: {
      200: {
        body: {
          message: "Signup success!"
        },
      },
    },
  },
  handler: signup,
});

export default router;
