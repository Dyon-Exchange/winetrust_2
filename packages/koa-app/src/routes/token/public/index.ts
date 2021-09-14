import Router from "koa-joi-router";

import mint from "./mint";

const { Joi } = Router;

const router = Router();
router.prefix("/token");

router.route({
  method: "post",
  path: "/mint",
  validate: {
    output: {
      200: {
        body: {
          token: Joi.string().required(),
        },
      },
    },
  },
  handler: mint,
});

export default router;
