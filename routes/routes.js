const router = require("koa-router")();
const connect = require('koa-connect');
const index = require("./index")
const user =  require("./users")
const jsonServer = require('json-server')
const server = jsonServer.create();
server.use(jsonServer.defaults());
const jsonRoute = jsonServer.router('db.json');

router.use('/api', connect(server));
router.use("/users" , index.routes(), index.allowedMethods())
router.use("/", user.routes(), user.allowedMethods())
module.exports = router