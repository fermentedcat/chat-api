const express = require('express')
const message = require('../controllers/message.controller')
const router = express.Router({
  mergeParams: true
});

/* 
/api/chat/:chatId/message
- GET get all by chat id
- POST add new message

/api/message/
- GET get message by id
- POST update message
- DELETE delete message
*/

router.get('/', message.getAllByChatId) // /api/chat/:chatId/message
router.get('/:messageId', message.getMessageById)
router.post('/', message.addNewMessage) // /api/chat/:chatId/message
router.post('/:messageId', message.updateMessage)
router.delete('/:messageId', message.deleteMessage)

module.exports = router