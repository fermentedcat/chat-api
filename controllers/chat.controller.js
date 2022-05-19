const ChatService = require('../services/chat.service.js')
const chatService = new ChatService()

exports.getAllChats = async (req, res, next) => {
  try {
    const response = await chatService.findAll()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getAllByUserId = async (req, res, next) => {
  try {
    const user = req.user
    const response = await chatService.findAllUserChats(user)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getChatById = async (req, res, next) => {
  try {
    const chatId = req.params.chatId
    const chat = await chatService.findById(chatId)
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.addNewChat = async (req, res, next) => {
  try {
    const user = req.user
    const chatData = req.body
    const chat = await chatService.createNew(user, chatData)
    res.status(201).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateChat = async (req, res, next) => {
  try {
    const chatId = req.params.chatId
    const user = req.user
    const chatData = req.body
    const chat = await chatService.update(chatId, user, chatData)
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteChat = async (req, res, next) => {
  const user = req.user
  const chatId = req.params.chatId
  try {
    await chatService.delete(chatId, user)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}