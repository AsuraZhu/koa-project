const router = require("koa-router")();
const index = require("./index")
const user =  require("./users")
router.use("/users" , index.routes(), index.allowedMethods())
router.use("/", user.routes(), user.allowedMethods())
module.exports = router