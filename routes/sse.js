const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const MessageService = require('../services/message.service')

// response header for sever-sent events
const SSE_RESPONSE_HEADER = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
}

// Connected users (request object of each user) :
var users = {}

// SSE starting endpoint
router.get('/chat/:chatId/messages', userAuth, (req, res, next) => {
  const { userId } = req.user
  const { chatId } = req.params
  const messageService = new MessageService()

  // data for sending
  let messages = []
  let counter = 0
  let interval = 3000
  let intervalId
  
  // Stores this connection
  users[userId] = req
  
  // Writes response header.
  res.writeHead(200, SSE_RESPONSE_HEADER)

  const checkInterval = () => {
    if (counter < 10 && interval > 3000 ) {
      interval = 3000
      clearInterval(intervalId)
      intervalId = setInterval(update, interval)
    }
    if (counter > 10 && interval !== 10000) {
      interval = 10000
      clearInterval(intervalId)
      intervalId = setInterval(update, interval)
    }
    if (counter > 60 && interval !== 40000) {
      interval = 40000
      clearInterval(intervalId)
      intervalId = setInterval(update, interval)
    }
  }

  const update = async () => {
    console.log('checking', counter, interval)
    try {
      const data = await messageService.findAllByChatId(chatId, req.user)
      if (data.length === messages.length) {
        counter++
      } else {
        counter = 0
        messages = data
      }
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    } catch (error) {
      console.log(error)
    }
    checkInterval()
  }

  intervalId = setInterval(update, interval)
  
  // Heartbeat to avoid request timeout first time (30 sec)
  res.write(`:\n\n`)
  
  req.on('close', function () {
    let { userId } = req.user
    console.log(`*** Close.URLSearchParamsrId: "${userId}"`)
    // Breaks the interval loop on client disconnected
    clearInterval(intervalId)
    // Remove from connections
    delete users[userId]
  })

  req.on('end', function () {
    let { userId } = req.user
    console.log(`*** End. userId: "${userId}"`)
  })
})

module.exports = router
