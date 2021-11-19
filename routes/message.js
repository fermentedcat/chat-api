const express = require('express')
const router = express.Router({
  mergeParams: true
});

const userAuth = require('../middlewares/userAuth')

const message = require('../controllers/message.controller')

/* 
/api/chat/:chatId/message
- GET get all by chat id
- POST add new message

/api/message/
- GET get message by id
- POST update message
- DELETE delete message
*/

router.get('/', userAuth, message.getAllByChatId) // /api/chat/:chatId/message
router.get('/:messageId', userAuth, message.getMessageById)
router.post('/', userAuth, message.addNewMessage) // /api/chat/:chatId/message
router.post('/:messageId', userAuth, message.updateMessage)
router.delete('/:messageId', userAuth, message.deleteMessage)

module.exports = router