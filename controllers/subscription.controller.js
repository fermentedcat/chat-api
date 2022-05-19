const SubscriptionService = require('../services/subscription.service.js')
const ChatService = require('../services/chat.service')
const subscriptionService = new SubscriptionService()
const chatService = new ChatService()

exports.getAllByRefId = async (req, res, next) => {
  try {
    const refIds = req.params
    const user = req.user
    const subscriptions = await subscriptionService.findAllByRefId(refIds, user)
    res.status(200).json(subscriptions)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.addNewSubscription = async (req, res, next) => {
  try {
    const { chatId, userId } = req.params
    const user = req.user
    const isPrivateChat = await chatService.checkIsPrivate(chatId)
    const newSubscription = await subscriptionService.authAndCreateNew(chatId, userId, user, isPrivateChat)
    res.status(201).json(newSubscription)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteByRefIds = async (req, res, next) => {
  try {
    const { chatId, userId } = req.params
    const user = req.user
    await subscriptionService.deleteByRefIds(chatId, userId, user)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteById = async (req, res, next) => {
  try {
    const subscriptionId = req.params.subscriptionId
    const user = req.user
    await subscriptionService.deleteByRefIds(subscriptionId, user)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}