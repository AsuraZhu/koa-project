const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require('koa-session');
const route = require("./routes/routes");
const logUtil = require("./utils/log_util");
//console.log(app.env = "prod")
app.keys = ['some secret'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}
// error handler
onerror(app);
app.use(session(CONFIG,app));
// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "swig"
  })
);

// logger
app.use(async (ctx, next) => {
  if (process.env.NODE_ENV === "prod") {
    const start = new Date();
    let ms;
    try {
      await next();
      ms = new Date() - start;
      logUtil.logResponse(ctx, ms);
    } catch (error) {
      ms = new Date() - start;
      logUtil.logError(ctx, error, ms);
    }
  } else {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  }
});

app.use(route.routes(), route.allowedMethods());
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

// log日志功能
module.exports = app;
