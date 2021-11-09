const Db = require('../db/db');
const User = require('../models/User');

class UserService {
  constructor(db = new Db(User)) {
    this.db = db
  }
  async findAll() {
    try {
      const user = await this.db.find()
      return user
    } catch (error) {
      throw error
    }
  }

  async createNew() {
    const data = {}
    try {
      const user = await this.db.create(data)
      return user
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService