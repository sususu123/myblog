const showIndexPage = (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })
}

module.exports = {
    showIndexPage
}