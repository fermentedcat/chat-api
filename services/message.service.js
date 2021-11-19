const Db = require('../db/db')
const Message = require('../models/Message')
const SubscriptionService = require('./subscription.service')

class MessageService {
  constructor() {
    this.db = new Db(Message)
    this.subscriptionService = new SubscriptionService()
  }
  async findAllByChatId(chatId, user) {
    try {
      const { userId, role } = user
      const subscription = await this.subscriptionService.findOneByRefIds(chatId, userId)
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
      const subscription = await this.subscriptionService.findOneByRefIds(chatId, userId)
      const isAuthorized = subscription || role === 'admin' || userId == message.author._id || userId == message.chat.creator

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
      
      const subscription = await this.subscriptionService.findOneByRefIds(chatId, userId)
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
      const populate = 'author'
      const message = await this.db.create(data, populate)
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

      const updated = await this.db.findByIdAndUpdate(messageId, data)
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
      const isAuthorized = role === 'admin' || userId == message.author || userId == message.chat.creator
      
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