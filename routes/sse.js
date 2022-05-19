const express = require('express')
const sse = require('../controllers/sse.controller')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

router.get('/chat/:chatId/messages', userAuth, sse.register)

module.exports = router
