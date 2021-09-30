import Multer from "@koa/multer";
import Router from "koa-joi-router";

import { authRequired } from "../../../services/passport";

import createProduct from "./createProduct";
import getProducts from "./getProducts";

const router = Router();
authRequired(router);

const multer = Multer();

router.prefix("/product");

router.post("/create", multer.single("product-image"), createProduct);

router.route({
  method: "get",
  path: "/get",
  handler: getProducts,
});

export default router;
