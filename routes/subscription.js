const express = require('express')
const router = express.Router({
  mergeParams: true
})
const userAuth = require('../middlewares/userAuth')

const subscription = require('../controllers/subscription.controller')

/* 
GET /
/api/user/:userId/subscription/
/api/chat/:chatId/subscription/

POST /
/api/chat/:chatId/user/:userId/subscription

DELETE /
/api/chat/:chatId/user/:userId/subscription

DELETE /:subscriptionId
/api/subscription
*/

router.get('/', userAuth, subscription.getAllByRefId) // by userId OR chatId
router.post('/', userAuth, subscription.addNewSubscription) // by userId AND chatId
router.delete('/', userAuth, subscription.deleteByRefIds)  // by userId AND chatId
router.delete('/:subscriptionId', userAuth, subscription.deleteById)

module.exports = router