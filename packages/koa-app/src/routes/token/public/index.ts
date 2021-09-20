import Router from "koa-joi-router";

import uploadTokenMetaData from "./uploadTokenMetaData";

const { Joi } = Router;

const router = Router();
router.prefix("/token");

router.route({
  method: "post",
  path: "/upload-token-metadata",
  validate: {
    output: {
      200: {
        body: {
          token: Joi.string().required(),
        },
      },
    },
  },
  handler: uploadTokenMetaData,
});

export default router;
