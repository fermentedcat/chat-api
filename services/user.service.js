const Db = require('../db/db')
const User = require('../models/User')
const password = require('../utils/password')
const { create: createToken } = require('../utils/token')
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

  async findAllByString(string) {
    try {
      const query = {
        $or: [
          { username: { $regex: string, $options: 'i' } },
          { fullName: { $regex: string, $options: 'i' } },
          { email: { $regex: string, $options: 'i' } },
        ],
      }
      const users = await this.db.find(query)
      return users
    } catch (error) {
      throw error
    }
  }

  async findByUsername(username) {
    try {
      const query = { username: username }
      const user = await this.db.findOne(query)
      return user
    } catch (error) {
      throw error
    }
  }

  async login(userData) {
    try {
      const { email, password } = userData

      const query = { email: { $regex: email, $options: 'i' } }
      const user = await this.db.findOne(query)

      const hash = user.password
      await password.match(password, hash)

      const token = createToken(user)
      return token
    } catch (error) {
      throw error
    }
  }

  async createNew(userData) {
    try {
      const hashedData = {
        ...userData,
        email: userData.email.toLowerCase(),
        password: await password.hash(userData.password),
      }
      const user = await this.db.create(hashedData)
      const token = createToken(user)
      return token
    } catch (error) {
      throw error
    }
  }

  async setPushToken(user, token) {
    try {
      const data = { 
        pushToken: token
      }
      const updated = await this.db.findByIdAndUpdate(user.userId, data)
      return updated
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
