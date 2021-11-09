const express = require('express')
const router = express.Router()

const chatRouter = require('./chat')
const messageRouter = require('./message')
const userRouter = require('./user')
const subscriptionRouter = require('./subscription')

router.get('/', (req, res) =>  res.send('Please use /api/'))

router.use('/api/chat/', chatRouter)
router.use('/api/message/', messageRouter)
router.use('/api/user/', userRouter)
router.use('/api/subscription/', subscriptionRouter)

module.exports = router