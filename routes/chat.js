const express = require('express')
const router = express.Router()
const chat = require('../controllers/chat.controller')
const messageRouter = require('./message')
const userRouter = require('./user')
const subscriptionRouter = require('./subscription')

/* 
/api/chat/
*/

router.use('/:chatId/message', messageRouter)
router.use('/:chatId/user', userRouter)
router.use('/:chatId/subscription', subscriptionRouter)

router.get('/', chat.getAllChats) //TODO: auth admin
router.get('/:chatId', chat.getChatById)
router.post('/', chat.addNewChat)
router.post('/:chatId', chat.updateChat)
router.delete('/:chatId', chat.deleteChat)

module.exports = router