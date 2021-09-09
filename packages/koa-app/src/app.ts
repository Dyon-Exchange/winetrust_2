import cors from "@koa/cors";
import { config } from "dotenv";
import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Logger from "koa-logger";

import router from "./routes";
import connect from "./services/database";

// configure env file
config({ path: `${__dirname}/../.env` });

const app: Koa = new Koa();
const port = 3030;

// connect to db
connect();

// cors setup
app.use(cors());

// body parser
app.use(
  BodyParser({
    enableTypes: ["json", "form", "text"],
  })
);

// logger
app.use(Logger());

// use router
app.use(router.middleware());

// error-handling
app.on("error", (err: Error, ctx: Koa.Context) => {
  // eslint-disable-next-line no-console
  console.error("server error", err, ctx);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on ${port}`));
