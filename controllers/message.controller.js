const MessageService = require('../services/message.service')
const messageService = new MessageService()

exports.getAllByChatId = async (req, res, next) => {
  const chatId = req.params.chatId
  res.send(`Get all messages by chat id ${chatId}`)
  // try {
  //   const response = await messageService.findAll()
  //   res.status(200).json(response)
  // } catch (error) {
  //   res.status(500).json(error)
  // }
}

exports.getMessageById = async (req, res, next) => {
  const messageId = req.params.messageId
  res.send(`Get message by message id ${messageId}`)
}

exports.addNewMessage = async (req, res, next) => {
  const chatId = req.params.chatId
  res.send(`Add new message to chat id ${chatId}`)
}

exports.updateMessage = async (req, res, next) => {
  const messageId = req.params.messageId
  res.send(`Update message by message id ${messageId}`)
}

exports.deleteMessage = async (req, res, next) => {
  const messageId = req.params.messageId
  res.send(`Delete message by message id ${messageId}`)
}