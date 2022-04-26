import Multer from "@koa/multer";
import Router from "koa-joi-router";

import validateObjectId from "../../../helpers/validateObjectId";
import { AssetState } from "../../../models/Asset";
import { adminAuthRequired } from "../../../services/passport";

import createAssetMetadata from "./createAssetMetadata";
import getAssets from "./getAssets";
import patchAsset from "./patchAsset";

const { Joi } = Router;

const router = Router();
adminAuthRequired(router);

const multer = Multer();

router.prefix("/assets");

router.post(
  "/",
  multer.fields([
    { name: "initial-condition-report" },
    { name: "initial-condition-report2" },
    { name: "initial-condition-report3" },
    { name: "initial-condition-report4" },
    { name: "initial-condition-report5" },
    { name: "initial-condition-report6" },
  ]),
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
        warehouseLocationNo: Joi.allow("")
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
