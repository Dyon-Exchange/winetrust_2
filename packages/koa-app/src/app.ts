import cors from "@koa/cors";
import { config } from "dotenv";
import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Logger from "koa-logger";
import Passport from "koa-passport";

import router from "./routes";
import connect from "./services/database";
import configPassport from "./services/passport";
import startCron from "./services/transferLog";

// configure env file
config({ path: `${__dirname}/../.env` });

const app: Koa = new Koa();
const port = process.env.PORT || 3030;

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

// setup passport config
configPassport(Passport);
app.use(Passport.initialize());

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

startCron();
