const express = require('express')
const router = express.Router({
  mergeParams: true
})
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

router.get('/', subscription.getAllSubscriptionsByRefId) // by userId OR chatId
router.post('/', subscription.addNewSubscription) // by userId AND chatId
router.delete('/', subscription.deleteSubscriptionByRefIds)  // by userId AND chatId
router.delete('/:subscriptionId', subscription.deleteSubscriptionById)

module.exports = router