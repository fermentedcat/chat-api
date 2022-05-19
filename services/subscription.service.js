const Db = require('../db/db')
const Subscription = require('../models/Subscription')

class SubscriptionService {
  constructor(chatService) {
    this.db = new Db(Subscription)
    this.chatService = chatService
  }

  async findAllByRefId(refIds, user) {
    try {
      // can be used with params chatId, userId or no params (req.user)
      const { chatId, userId } = refIds
      const refId = chatId || userId || user.userId
      const query = { $or: [{ chat: refId }, { user: refId }] }
      const populate = 'chat'

      const subscriptions = await this.db.find(query, populate)

      const hasSubscription = subscriptions.some(
        (doc) => doc.user == user.userId
      )

      // needs to be the same user or admin to find all by user id
      let isAuthorized = userId == user.userId || user.role === 'admin'
      // needs to be subscriber to find all by chat id
      if (chatId) {
        isAuthorized = hasSubscription || user.role === 'admin'
      }

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }

      return subscriptions
    } catch (error) {
      throw error
    }
  }

  // find other chat subscribers than this user
  async findOtherSubscriptions(chatId, userId) {
    try {
      const query = { chat: chatId, user: { $ne: userId } }
      const populate = 'user'
      const subscriptions = await this.db.find(query, populate)
      return subscriptions
    } catch (error) {
      throw error
    }
  }

  async findOneByRefIds(chatId, userId) {
    try {
      const query = { $and: [{ chat: chatId }, { user: userId }] }
      const subscription = await this.db.findOne(query)
      return subscription
    } catch (error) {
      throw error
    }
  }

  async createNew(chatId, userId) {
    try {
      const data = {
        user: userId,
        chat: chatId,
      }
      const subscription = await this.db.create(data)
      return subscription
    } catch (error) {
      throw error
    }
  }

  async authAndCreateNew(chatId, userId, user) {
    try {
      const isSelf = user.userId === userId
      const isAdmin = user.role === 'admin'

      if (!isSelf && !isAdmin) {
        // req user is someone else and is not admin
        // check user is subscriber
        const query = { $and: [{ chat: chatId }, { user: user.userId }] }
        const isSubscriber = await this.db.findOne(query)
        if (!isSubscriber) {
          throw new Error('Not authorized.')
        }
      } else {
        // req user is the new subscriber
        const chat = await this.chatService.findById(chatId)
        if (chat.private) {
          throw new Error('Not authorized.')
        }
      }
      const query = { $and: [{ chat: chatId }, { user: userId }] }
      const isAlreadySubscriber = await this.db.findOne(query)

      if (isAlreadySubscriber) {
        throw new Error('Subscription already exists.')
      }

      const subscription = await this.createNew(chatId, userId)
      return subscription
    } catch (error) {
      throw error
    }
  }

  async deleteByRefIds(chatId, userId, user) {
    try {
      const chat = await this.chatDb.findById(chatId)
      const isAuthorized =
        user.userId == chat.author ||
        user.userId === userId ||
        user.role === 'admin'
      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }
      const query = { $and: [{ chat: chatId }, { user: userId }] }
      const deleted = await this.db.findOneAndDelete(query)
      return deleted
    } catch (error) {
      throw error
    }
  }

  async deleteById(subscriptionId, user) {
    try {
      const chat = await this.chatDb.findById(chatId)
      const isAuthorized =
        user.userId == chat.author ||
        user.userId === userId ||
        user.role === 'admin'
      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }
      const deleted = await this.db.findByIdAndDelete(subscriptionId)
      return deleted
    } catch (error) {
      throw error
    }
  }

  async deleteAllChatSubscriptions(chatId) {
    // after chat delete
    try {
      const query = { chat: chatId }
      const deleted = await this.db.deleteMany(query)
      return deleted
    } catch (error) {
      throw error
    }
  }

  async deleteAllUserSubscriptions(userId) {
    // after user delete
    try {
      const query = { user: userId }
      const deleted = await this.db.deleteMany(query)
      return deleted
    } catch (error) {
      throw error
    }
  }
}

module.exports = SubscriptionService
