import Multer from "@koa/multer";
import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createProduct from "./createProduct";
import deleteProduct from "./deleteProduct";
import deleteProducts from "./deleteProducts";
import getProducts from "./getProducts";
import searchProducts from "./searchProducts";

const { Joi } = Router;

const router = Router();
authRequired(router);

const multer = Multer();

router.prefix("/products");

const imageFields = [
  { name: "product-image", maxCount: 1 },
  { name: "label-image", maxCount: 1 },
  { name: "bottle-image", maxCount: 1 },
  { name: "marketing1-image", maxCount: 1 },
  { name: "marketing2-image", maxCount: 1 },
  { name: "marketing3-image", maxCount: 1 },
  { name: "marketing4-image", maxCount: 1 },
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
