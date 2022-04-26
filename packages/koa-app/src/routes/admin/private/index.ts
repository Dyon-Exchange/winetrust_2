import Router from "koa-joi-router";

import { adminAuthRequired } from "../../../services/passport";

import changePassword from "./changePassword";

const { Joi } = Router;

const router = Router();
adminAuthRequired(router);
router.prefix("/admins");

router.route({
    method: "put",
    path: "/changepassword",
    validate: {
      body: {
        password: Joi.string().required(),
      },
      type: "json",
    },
    handler: changePassword,
  });

export default router;
