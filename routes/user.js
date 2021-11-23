const express = require('express')
const router = express.Router({
  mergeParams: true
})

const userAuth = require('../middlewares/userAuth')

const user = require('../controllers/user.controller')

const subscriptionRouter = require('./subscription')

/* 
/api/user/
*/

// pass params from /api/chat/:chatId/
router.use('/:userId/subscription', subscriptionRouter) 

router.get('/auth', userAuth, user.authenticate)
router.get('/', user.getAllUsers) //TODO: admin auth
router.get('/search/:username', user.searchUser)
router.get('/search-all/:string', user.searchUsers)
router.get('/:userId', userAuth, user.getUserById)
router.post('/login', user.login)
router.post('/', user.addNewUser)
router.post('/:userId', userAuth, user.updateUser)
router.delete('/:userId', userAuth, user.deleteUser)

module.exports = router