import Multer from "@koa/multer";
import Router from "koa-joi-router";

import { adminAuthRequired } from "../../../services/passport";

import createProduct from "./createProduct";
import deleteProduct from "./deleteProduct";
import deleteProducts from "./deleteProducts";
import getProducts from "./getProducts";
import patchProduct from "./patchProduct";
import searchProducts from "./searchProducts";

const { Joi } = Router;

const router = Router();
adminAuthRequired(router);

const multer = Multer();

router.prefix("/products");

const imageFields = [
  { name: "label-image" },
  { name: "bottle-image" },
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

router.patch("/:productId", multer.fields(imageFields), patchProduct);

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
