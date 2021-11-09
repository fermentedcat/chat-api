const SubscriptionService = require('../services/subscription.service.js')
const subscriptionService = new SubscriptionService()

exports.getAllSubscriptionsByRefId = async (req, res, next) => {
  const { chatId, userId } = req.params
  res.send(`Get subscriptions by chat id: ${chatId} or user id: ${userId}`)
}

exports.addNewSubscription = async (req, res, next) => {
  const { chatId, userId } = req.params
  res.send(`Add new subscription by chatId ${chatId} and userId ${userId}`)
}

exports.deleteSubscriptionByRefIds = async (req, res, next) => {
  const { chatId, userId } = req.params
  res.send(`Delete subscription by chatId ${chatId} and userId ${userId}`)
}

exports.deleteSubscriptionById = async (req, res, next) => {
  const subscriptionId = req.params.subscriptionId
  res.send(`Delete subscription by subscription id ${subscriptionId}`)
}