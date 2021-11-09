const ChatService = require('../services/chat.service.js')
const chatService = new ChatService()

exports.getAllChats = async (req, res, next) => {
  res.send(`Get all chats`)
  /* try {
    const response = await chatService.findAll()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  } */
}

exports.getChatById = async (req, res, next) => {
  const chatId = req.params.chatId
  res.send(`Get chat by chat id ${chatId}`)
}

exports.addNewChat = async (req, res, next) => {
  res.send(`Add new chat`)
}

exports.updateChat = async (req, res, next) => {
  const chatId = req.params.chatId
  res.send(`Update chat by chat id ${chatId}`)
}

exports.deleteChat = async (req, res, next) => {
  const chatId = req.params.chatId
  res.send(`Delete chat by chat id ${chatId}`)
}