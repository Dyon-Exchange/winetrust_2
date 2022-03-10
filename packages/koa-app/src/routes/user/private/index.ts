import Multer from "@koa/multer";
import Router, { Joi } from "koa-joi-router";

import { userAuthRequired } from "../../../services/passport";

import updateUserProfile from "./updateUserProfile";

const router = Router();
userAuthRequired(router);
router.prefix("/users");

const multer = Multer();

router.post(
  "/profile",
  // {
  //   validate: {
  //     type: "json",
  //     body: {
  //       email: Joi.string().email(),
  //       firstName: Joi.string(),
  //       lastName: Joi.string(),
  //       phoneNumber: {
  //         countryCode: Joi.string().required(),
  //         phoneNumber: Joi.string().required(),
  //       },
  //     },
  //   },
  // },
  multer.single("profile-image"),
  updateUserProfile
);

export default router;
