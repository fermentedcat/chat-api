const MessageService = require('../services/message.service')
const messageService = new MessageService()

exports.getAllByChatId = async (req, res, next) => {  
  try {
    const chatId = req.params.chatId
    const user = req.user
    const response = await messageService.findAllByChatId(chatId, user)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getMessageById = async (req, res, next) => {  
  try {
    const messageId = req.params.messageId
    const user = req.user
    const message = await messageService.findById(messageId, user)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.addNewMessage = async (req, res, next) => {
  try {
    const chatId = req.params.chatId
    const user = req.user
    const messageData = req.body
    const message = await messageService.createNew(chatId, user, messageData)
    res.status(201).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateMessage = async (req, res, next) => {
  try {
    const messageId = req.params.messageId
    const user = req.user
    const messageData = req.body
    const message = await messageService.update(messageId, user, messageData)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteMessage = async (req, res, next) => {
  try {
    const messageId = req.params.messageId
    const user = req.user
    await messageService.delete(messageId, user)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}