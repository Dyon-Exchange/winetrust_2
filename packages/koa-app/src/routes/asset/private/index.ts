import Multer from "@koa/multer";
import Router from "koa-joi-router";

import validateObjectId from "../../../helpers/validateObjectId";
import { authRequired } from "../../../services/passport";

import createAssetMetadata from "./createAssetMetadata";
import getAssets from "./getAssets";
import patchAssetWithTxHash from "./patchAssetWithTxHash";

const { Joi } = Router;

const router = Router();
authRequired(router);

const multer = Multer();

router.prefix("/assets");

router.post(
  "/",
  multer.single("initial-condition-report"),
  createAssetMetadata
);

router.route({
  method: "patch",
  path: "/",
  validate: {
    type: "json",
    query: {
      "asset-id": Joi.string()
        .required()
        .custom(validateObjectId)
        .example("60da675cdf9ae719a4129684"),
    },
    body: {
      txHash: Joi.string().required().allow(""),
    },
  },
  handler: patchAssetWithTxHash,
});

// router.route({
//   method: "post",
//   path: "/",
//   validate: {
//     type: "multipart",
//     body: {
//       assetId: Joi.string().required().allow(""),
//       externalURL: Joi.string().required().allow(""),
//     },
//   },
//   handler: [multer.single("initial-condition-report"), createAssetMetadata],
// });

router.route({
  method: "get",
  path: "/",
  handler: getAssets,
});

export default router;
