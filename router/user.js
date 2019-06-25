//业务模块
const express = require('express')
const router = express.Router()

const ctrl = require('../controller/user.js')

//用户请求 登录页面
router.get('/login', ctrl.showLoginPage)

//用户请求 注册页面
router.get('/register', ctrl.showRegisterPage)

//要注册新用户了
router.post('/register', ctrl.reg)

//监听登录的请求
router.post('/login', ctrl.login)

//注销请求
router.get('/logout', ctrl.logout)

module.exports = router