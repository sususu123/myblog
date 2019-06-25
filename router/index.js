//封装路由模块的目的，是为了保证每个模块的职能单一性
//对于路由模块来说，只需要分配 URL 地址到处理函数之间的对应关系即可
//路由模块，并不关心如何处理这一次请求
const express = require('express')
const router = express.Router()

//导入自己的业务模块
const ctrl = require('../controller/index.js')

//用户请求的是首页
router.get('/', ctrl.showIndexPage)

module.exports = router