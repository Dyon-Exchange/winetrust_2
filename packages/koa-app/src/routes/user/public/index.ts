import Router, { Joi } from "koa-joi-router";

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

export default router;
