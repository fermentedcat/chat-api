const express = require('express')
const router = express.Router()

const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')

const chat = require('../controllers/chat.controller')

const userRouter = require('./user')
const messageRouter = require('./message')
const subscriptionRouter = require('./subscription')

/* 
/api/chat/
*/

router.use('/:chatId/message', messageRouter)
router.use('/:chatId/user', userRouter)
router.use('/:chatId/subscription', subscriptionRouter)

router.get('/', adminAuth, chat.getAllChats)
router.get('/:chatId', userAuth, chat.getChatById)
router.post('/', userAuth, chat.addNewChat)
router.post('/:chatId', userAuth, chat.updateChat)
router.delete('/:chatId', userAuth, chat.deleteChat)

module.exports = router