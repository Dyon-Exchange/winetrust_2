import { Context, Request } from "koa";

export default interface ExtendedContext<T extends Request> extends Context {
  request: T;
}
