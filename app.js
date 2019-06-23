const express = require('express')
const app = express()

//设置默认模块引擎名称
app.set('view engine', 'ejs')

//设置模板页面的存放路径
app.set('views', './views')

//设置node_modules为静态托管文件
app.use('/node_modules', express.static('node_modules'))

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'su', age: 22 })
})

app.listen(80, () => {
    console.log("running...");

});