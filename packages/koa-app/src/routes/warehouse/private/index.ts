import Router from "koa-joi-router";

import { adminAuthRequired } from "../../../services/passport";

import createWarehouse from "./createWarehouse";
import deleteWarehouse from "./deleteWarehouse";
import getWarehouses from "./getWarehouses";
import searchWarehouses from "./searchWarehouses";

const { Joi } = Router;

const router = Router();
adminAuthRequired(router);
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

router.route({
  method: "get",
  path: "/search",
  validate: {
    query: {
      name: Joi.string().required().allow(""),
    },
  },
  handler: searchWarehouses,
});

router.route({
  method: "delete",
  path: "/",
  handler: deleteWarehouse,
});

export default router;
