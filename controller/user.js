const moment = require('moment')
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blogdata'
});

//展示注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}

//展示登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}

//注册新用户的请求地址
const reg = (req, res) => {
    const body = req.body
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的表单数据后再注册用户！', status: 501 })
    }
    //查询用户名是否重复
    const sql1 = 'select count(*) as count from users where username=?'

    conn.query(sql1, body.username, (err, result) => {
        //如果查询失败，则告知客户端失败
        if (err) return res.send({ msg: '用户查重失败！', status: 502 })

        if (result[0].count !== 0) return res.send({ msg: '请更换其它用户名后重新注册', status: 503 })

        //执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into users set ?'
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册新用户失败！', status: 504 })
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
            res.send({ mas: '注册新用户成功！', status: 200 })
        })
    })
}

//登录的请求处理函数
const login = (req, res) => {
    //1.获取到表单中的数据
    const body = req.body
        //2.执行SQL语句，查询用户是否存在
    const sql1 = 'select * from users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        if (err) return res.send({ msg: '用户登录失败', status: 501 })
        if (result.length !== 1) return res.send({ msg: '用户登录失败！', status: 502 })

        // 将登录的用户保存到session中
        req.session.user = result.dataValues;
        // 设置是否登录为true
        req.session.islogin = true;
        //登录成功
        res.send({ msg: 'ok', status: 200 })
    })
}

//注销请求
const logout = (req, res) => {
    req.session.destroy(function() {
        //使用res.redirect 方法可以让 客户端重新访问 指定的页面
        res.redirect('/')
    })
}
module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login,
    logout
}