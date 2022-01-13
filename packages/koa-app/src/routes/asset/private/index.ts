import Multer from "@koa/multer";
import Router from "koa-joi-router";

import validateObjectId from "../../../helpers/validateObjectId";
import { AssetState } from "../../../models/Asset";
import { authRequired } from "../../../services/passport";

import createAssetMetadata from "./createAssetMetadata";
import getAssets from "./getAssets";
import patchAsset from "./patchAsset";

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
      assetUpdates: Joi.object().keys({
        txHash: Joi.string().allow(""),
        state: Joi.string().valid(...Object.values(AssetState)),
        warehouseLocationNo: Joi.string().required()
      }),
    },
  },
  handler: patchAsset,
});

router.route({
  method: "get",
  path: "/",
  handler: getAssets,
});

export default router;
