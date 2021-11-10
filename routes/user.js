const express = require('express')
const router = express.Router({
  mergeParams: true
})
const user = require('../controllers/user.controller')
const subscriptionRouter = require('./subscription')

/* 
/api/user/
*/

// pass params from /api/chat/:chatId/
router.use('/:userId/subscription', subscriptionRouter) 

router.get('/', user.getAllUsers) //TODO: admin auth
router.get('/:userId', user.getUserById)
router.post('/', user.addNewUser)
router.post('/:userId', user.updateUser)
router.delete('/:userId', user.deleteUser)

module.exports = router