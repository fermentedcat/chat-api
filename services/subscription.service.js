const Db = require('../db/db');
const Subscription = require('../models/Subscription');

class SubscriptionService {
  constructor(db = new Db(Subscription)) {
    this.db = db
  }
  async findAllByChatId(chatId) {
    const query = [{ chatId: chatId }]
    const populate = 'chat'
    try {
      const subscriptions = await this.db.find(query, populate)
      return subscriptions
    } catch (error) {
      throw error
    }
  }

  async findAllByUserId(chatId) {
    const query = [{ userId: userId }]
    const populate = 'chat'
    try {
      const subscriptions = await this.db.find(query, populate)
      return subscriptions
    } catch (error) {
      throw error
    }
  }
}

module.exports = SubscriptionService