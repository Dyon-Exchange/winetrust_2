import Router from "koa-joi-router";
import getAssets from "./getAssets";

const router = Router();
router.prefix("/public/assets");

router.route({
  method: "get",
  path: "/:type/:id",
  handler: getAssets,
});
export default router;
