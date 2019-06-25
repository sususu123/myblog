const showAddArticlePage = (req, res) => {
    //如果用户没有登录，则不允许访问文章添加页
    if (!req.session.islogin) return res.redirect('/')
    res.render('./article/add.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })
}

module.exports = {
    showAddArticlePage
}