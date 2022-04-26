import Multer from "@koa/multer";
import Router from "koa-joi-router";

import { adminAuthRequired } from "../../../services/passport";

import createProduct from "./createProduct";
import deleteProduct from "./deleteProduct";
import deleteProducts from "./deleteProducts";
import getProducts from "./getProducts";
import searchProducts from "./searchProducts";

const { Joi } = Router;

const router = Router();
adminAuthRequired(router);

const multer = Multer();

router.prefix("/products");

const imageFields = [
  { name: "product-image" },
  { name: "label-image" },
  { name: "label2-image" },
  { name: "bottle-image" },
  { name: "bottle2-image" },
  { name: "marketing1-image" },
  { name: "marketing2-image" },
  { name: "marketing3-image" },
  { name: "marketing4-image" },
];

router.post("/", multer.fields(imageFields), createProduct);

router.route({
  method: "get",
  path: "/",
  handler: getProducts,
});

router.route({
  method: "get",
  path: "/search",
  validate: {
    query: {
      "product-name": Joi.string().required().allow(""),
    },
  },
  handler: searchProducts,
});

router.route({
  method: "delete",
  path: "/:productId",
  handler: deleteProduct,
});

router.route({
  method: "delete",
  path: "/",
  handler: deleteProducts,
});

export default router;
