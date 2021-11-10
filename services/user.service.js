const Db = require('../db/db');
const User = require('../models/User');
const SubscriptionService = require('./subscription.service')

class UserService {
  constructor() {
    this.db = new Db(User)
    this.subscriptionService = new SubscriptionService()
  }
  async findAll() {
    try {
      const users = await this.db.find()
      return users
    } catch (error) {
      throw error
    }
  }

  async findById(userId) {
    try {
      const user = await this.db.findById(userId)
      return user
    } catch (error) {
      throw error
    }
  }

  async createNew(userData) {
    try {
      const user = await this.db.create(userData)
      return user
    } catch (error) {
      throw error
    }
  }

  async update(user, userId, userData) {
    try {
      const isAuthorized = user.userId === userId || user.role === 'admin'

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }

      const newUser = await this.db.findByIdAndUpdate(userId, userData)
      return newUser
    } catch (error) {
      throw error
    }
  }

  async delete(user, userId) {
    try {
      const isAuthorized = user.userId === userId || user.role === 'admin'

      if (!isAuthorized) {
        throw new Error('Not authorized.')
      }

      const deleted = await this.db.findByIdAndDelete(userId)
      await this.subscriptionService.deleteAllUserSubscriptions(userId)
      return deleted
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService