import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createWarehouse from "./createWarehouse";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/warehouse");

router.route({
  method: "post",
  path: "/create",
  validate: {
    body: {
      warehouseName: Joi.string().required(),
      warehouseAddress: Joi.string().required(),
      contactName: Joi.string().required(),
      contactEmail: Joi.string().required(),
    },
    type: "json",
  },
  handler: createWarehouse,
});

export default router;
