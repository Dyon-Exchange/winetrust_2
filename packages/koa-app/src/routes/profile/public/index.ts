import Router from "koa-joi-router";

import createProfile from "../private/createProfile";
import deleteProfile from "../private/deleteProfile";
import getProfile from "../private/getProfile";
import getProfiles from "../private/getProfiles";


const router = Router();
const { Joi } = Router;

router.prefix("/public/profiles");
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
