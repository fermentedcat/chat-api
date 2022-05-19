const Db = require('../db/db')
const Message = require('../models/Message')
const SubscriptionService = require('./subscription.service')
const PushService = require('./push.service')
const sse = require('../controllers/sse.controller')

class MessageService {
  constructor() {
    this.db = new Db(Message)
    this.subscriptionService = new SubscriptionService()
    this.pushService = new PushService()
  }
  async findAllByChatId(chatId, user) {
    try {
      const { userId, role } = user
      const subscription = await this.subscriptionService.findOneByRefIds(
        chatId,
        userId
      )
      const isAuthorized = subscription || role === 'admin'

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }
      const populate = 'author'
      const query = { chat: chatId }
      const messages = await this.db.find(query, populate)

      return messages
    } catch (error) {
      throw error
    }
  }

  async findById(messageId, user) {
    try {
      const populate = 'author chat'
      const message = await this.db.findById(messageId, populate)

      const chatId = message.chat._id
      const { userId, role } = user
      const subscription = await this.subscriptionService.findOneByRefIds(
        chatId,
        userId
      )
      const isAuthorized =
        subscription ||
        role === 'admin' ||
        userId == message.author._id ||
        userId == message.chat.creator

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }

      return message
    } catch (error) {
      throw error
    }
  }

  async createNew(chatId, user, messageData) {
    try {
      const { userId } = user

      const subscription = await this.subscriptionService.findOneByRefIds(
        chatId,
        userId
      )
      if (!subscription) {
        throw new Error('Not authorized.')
      }

      const data = {
        chat: chatId,
        author: userId,
      }
      if (messageData.text) {
        data.text = messageData.text
      }
      if (messageData.photo) {
        data.photo = messageData.text
      }
      const populate = 'author chat'
      const message = await this.db.create(data, populate)

      // send new message to other users in room
      const liveUpdateRecipients = sse.send(chatId, userId, message)

      const subscriptions = await this.subscriptionService.findOtherSubscriptions(
        chatId,
        userId
      )

      // find subscribers with push tokens that are not in the chat room
      const pushTokens = subscriptions.reduce((filtered, doc) => {
        const hasRecievedUpdate = liveUpdateRecipients.findIndex((user) => doc.user.id === user.id) !== -1
        const isAuthor = doc.user._id === userId
        if (!hasRecievedUpdate && !isAuthor && doc.user.pushToken) {
          filtered.push(doc.user.pushToken)
        }
        return filtered
      }, [])

      this.pushService.pushNewMessage(pushTokens, message)

      return message
    } catch (error) {
      throw error
    }
  }

  async update(messageId, user, messageData) {
    try {
      const data = {}
      if (messageData.text) {
        data.text = messageData.text
      }
      if (messageData.photo) {
        data.photo = messageData.text
      }

      const message = await this.db.findById(messageId)
      const { userId, role } = user
      const isAuthorized = role === 'admin' || userId == message.author

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }
      const populate = 'author'
      const updated = await this.db.findByIdAndUpdate(messageId, data, populate)
      return updated
    } catch (error) {
      throw error
    }
  }

  async delete(messageId, user) {
    try {
      const populate = 'chat'
      const message = await this.db.findById(messageId, populate)

      const { userId, role } = user
      const isAuthorized =
        role === 'admin' ||
        userId == message.author ||
        userId == message.chat.creator

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }

      const deleted = await this.db.findByIdAndDelete(messageId)
      return deleted
    } catch (error) {
      throw error
    }
  }

  async deleteAllFromChat(chatId) {
    // after chat delete
    try {
      const query = { chat: chatId }
      const deleted = await this.db.deleteMany(query)
      return deleted
    } catch (error) {
      throw error
    }
  }
}

module.exports = MessageService
