const SSE_RESPONSE_HEADERS = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
}

// stores objects containing userId & response
let clients = []

exports.register = (req, res, next) => {
  try {
    const { userId } = req.user
    const { chatId } = req.params
    
    res.writeHead(200, SSE_RESPONSE_HEADERS)
    
    const newClient = {
      id: userId,
      room: chatId,
      response: res
    }
    clients.push(newClient)
    
    // Heartbeat to avoid request timeout first time (30 sec)
    res.write(`:\n\n`)
    res.write(`retry: 1000\n`)
    console.log(`*** New registration. userId: "${userId}"`)

    req.on('close', () => {
      console.log(`*** Connection closed. userId: "${userId}"`);
      clients = clients.filter(client => client.id !== userId);
    })

    req.on('end', function () {
      let { userId } = req.user
      console.log(`*** Ended. userId: "${userId}"`)
    })

  } catch (error) {
    res.status(500).json(error)
  }
}

// send updated content (messages to chatrooms / chats to chatlist)
exports.send = (chatId, author, data) => {
  // clients subscribing to this chat, currently in this chat room
  const recipients = clients.filter((client) => {
    const isMessageAuthor = client.id == author
    const isInChatRoom = chatId == client.room
    return !isMessageAuthor && isInChatRoom
  })
  
  recipients.forEach((client) => {
    console.log(`Sending message to userId: "${client.id}"`)
    client.response.write(`data: ${JSON.stringify(data)}\n\n`)
  })
  return recipients
}