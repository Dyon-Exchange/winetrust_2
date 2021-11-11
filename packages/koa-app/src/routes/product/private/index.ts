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

router.post("/", multer.single("product-image"), createProduct);

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
  path: "/products",
  handler: deleteProducts,
});

export default router;
