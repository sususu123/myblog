const express = require('express')
const router = express.Router()

const ctrl = require('../controller/article.js')
router.get('/article/add', ctrl.showAddArticlePage)

module.exports = router