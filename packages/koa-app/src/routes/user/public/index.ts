import Router, { Joi } from "koa-joi-router";

import authenticate from "./authenticate";
import createUser from "./createUser";
import searchUsers from "./searchUsers";

const router = Router();
router.prefix("/users");

router.route({
  method: "post",
  path: "/",
  validate: {
    body: {
      address: Joi.string().required(),
    },
    type: "json",
  },
  handler: createUser,
});

router.route({
  method: "get",
  path: "/search",
  validate: {
    query: {
      address: Joi.string().required(),
    },
  },
  handler: searchUsers,
});

router.route({
  method: "post",
  path: "/auth",
  validate: {
    body: {
      address: Joi.string().required(),
      signature: Joi.string().required(),
    },
    type: "json",
    output: {
      200: {
        body: {
          token: Joi.string().required(),
        },
      },
    },
  },
  handler: authenticate,
});

export default router;
