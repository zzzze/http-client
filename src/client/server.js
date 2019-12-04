const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('@koa/router')
const getCommentData = require('./getComments')

const app = new Koa()
const router = new Router()


router.get('/', async (ctx, next) => {
  // ctx.router available
  const comments = await getCommentData()
  ctx.body = comments
})


app.use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(ctx.request.body)
  console.log(ctx.request.header)
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(3001);
