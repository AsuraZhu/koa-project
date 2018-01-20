const router = require('koa-router')()
const axios = require('axios');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  let data = await axios.get('https://www.baidu.com')
  ctx.cookies.set(data.headers['set-cookie'])
  ctx.body = "asadas";
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

