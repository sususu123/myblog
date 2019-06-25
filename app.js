const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
    //导入session模块
const session = require('express-session')

// 启用 session 中间件
app.use(session({
    secret: '这是密钥', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}))

//设置默认模块引擎名称
app.set('view engine', 'ejs')

//设置模板页面的存放路径
app.set('views', './views')

//注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

//设置node_modules为静态托管文件
app.use('/node_modules', express.static('node_modules'))

// //导入/router/index.js路由模块
// const router1 = require('./router/index.js')
// app.use(router1)

// //导入用户相关的路由模块
// const router2 = require('./router/user.js')
// app.use(router2)

//使用循环的方式读取路由
fs.readdir(path.join(__dirname, '/router'), (err, filenames) => {
    if (err) return console.log('读取router目录中的路由失败')
        //循环router 目录下的每一个文件名
    filenames.forEach(fname => {
        const router = require(path.join(__dirname, './router', fname))
        app.use(router)
    })

})

app.listen(80, () => {
    console.log("running...");

});