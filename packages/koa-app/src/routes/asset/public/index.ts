import Router, { Joi } from "koa-joi-router";

import getAsset from "./getAsset";
import searchAssets from "./searchAssets";

const router = Router();
router.prefix("/assets");

router.route({
  method: "get",
  path: "/search",
  validate: {
    query: {
      query: Joi.string().allow(null, ""),
    },
  },
  handler: searchAssets,
});

router.route({
  method: "get",
  path: "/:assetId",
  validate: {
    params: {
      assetId: Joi.string().required(),
    },
  },
  handler: getAsset,
});

export default router;
