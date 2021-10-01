import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createWarehouse from "./createWarehouse";
import getWarehouses from "./getWarehouses";

const { Joi } = Router;

const router = Router();
authRequired(router);
router.prefix("/warehouses");

router.route({
  method: "post",
  path: "/",
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

router.route({
  method: "get",
  path: "/",
  handler: getWarehouses,
});

export default router;
