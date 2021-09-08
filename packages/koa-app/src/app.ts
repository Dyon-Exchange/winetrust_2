import cors from "@koa/cors";
import Koa from "koa";
import BodyParser from "koa-bodyparser";

import router from "./routes";

const app: Koa = new Koa();
const port = 3030;

// cors setup
app.use(cors());

// body parser
app.use(
  BodyParser({
    enableTypes: ["json", "form", "text"],
  })
);

// use router
app.use(router.middleware());

// error-handling
app.on("error", (err: Error, ctx: Koa.Context) => {
  // eslint-disable-next-line no-console
  console.error("server error", err, ctx);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`\nListening on ${port}\n`));
