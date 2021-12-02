const Db = require('../db/db')
const Chat = require('../models/Chat')
const MessageService = require('./message.service')
const SubscriptionService = require('./subscription.service')

class ChatService {
  constructor() {
    this.db = new Db(Chat)
    this.messageService = new MessageService()
    this.subscriptionService = new SubscriptionService(this)
  }
  async findAll() {
    try {
      const populate = 'creator'
      const chats = await this.db.find({}, populate)
      return chats
    } catch (error) {
      throw error
    }
  }

  async findAllUserChats(user) {
    try {
      const { userId } = user
      const subscriptions = await this.subscriptionService.findAllByUserId(
        userId
      )
      return subscriptions
    } catch (error) {
      throw error
    }
  }

  async findById(chatId) {
    try {
      const chat = await this.db.findById(chatId, 'creator')
      return chat
    } catch (error) {
      throw error
    }
  }

  async createNew(user, chatData) {
    try {
      const { userId } = user
      const data = {
        creator: userId,
        title: chatData.title,
        private: chatData.private,
      }
      
      const chat = await this.db.create(data)
      await this.subscriptionService.createNew(chat._id, userId)
      return chat
    } catch (error) {
      throw error
    }
  }

  async update(chatId, user, chatData) {
    try {
      const { userId, role } = user
      const chat = await this.db.findById(chatId)
      const subscription = await this.subscriptionService.findOneByRefIds(chatId, userId)

      if (role !== 'admin' && userId != chat.creator && !subscription) {
        throw new Error('Not authorized')
      }

      const updated = await this.db.findByIdAndUpdate(chatId, chatData)
      return updated
    } catch (error) {
      throw error
    }
  }

  async delete(chatId, user) {
    try {
      const { userId, role } = user
      const chat = await this.db.findById(chatId)

      if (role !== 'admin' && userId != chat.creator) {
        throw new Error('Not authorized')
      }
      const deleted = await this.db.findByIdAndDelete(chatId)
      await this.messageService.deleteAllFromChat(chatId)
      await this.subscriptionService.deleteAllChatSubscriptions(chatId)
      return deleted
    } catch (error) {
      throw error
    }
  }
}

module.exports = ChatService
