import Router, { Joi } from "koa-joi-router";

import { userAuthRequired } from "../../../services/passport";

import updateUserProfile from "./updateUserProfile";

const router = Router();
userAuthRequired(router);
router.prefix("/users");

router.route({
  method: "patch",
  path: "/profile",
  validate: {
    type: "json",
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      phoneNumber: {
        countryCode: Joi.string().required(),
        phoneNumber: Joi.string().required(),
      },
    },
  },
  handler: updateUserProfile,
});

export default router;
