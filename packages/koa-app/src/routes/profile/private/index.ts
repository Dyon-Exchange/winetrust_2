import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createProfile from "./createProfile";
import deleteProfile from "./deleteProfile";
import getProfiles from "./getProfiles";
import getProfile from "./getProfile";


const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/profiles");

router.route({
  method: "post",
  path: "/",
  validate: {
    body: {
      chainId: Joi.string(),
      walletAddress: Joi.string(),
      email: Joi.string(),
    },
    type: "json",
  },
  handler: createProfile,
});

router.route({
  method: "get",
  path: "/",
  handler: getProfiles,
});


router.route({
  method: "get",
  path: "/:profileId",
  handler: getProfile,
});

router.route({
  method: "delete",
  path: "/:profileId",
  handler: deleteProfile,
});

export default router;
