import cors from "@koa/cors";
import Koa from "koa";
import BodyParser from "koa-bodyparser";

const app: Koa = new Koa();

// cors setup
app.use(cors());

// body parser
app.use(
  BodyParser({
    enableTypes: ["json", "form", "text"],
  })
);

// logger
app.use(async (ctx: Koa.Context, next: Function) => {
  await next();
});

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// error-handling
app.on("error", (err: Error, ctx: Koa.Context) => {
  // eslint-disable-next-line no-console
  console.error("server error", err, ctx);
});

app.listen(3000);
