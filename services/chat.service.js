const Db = require('../db/db');
const Chat = require('../models/Chat');

class ChatService {
  // Add param db for testability
  constructor(db = new Db(Chat)) {
    this.db = db
  }
  async findAll(user) {
    try {
      const chats = await this.db.find()
      return chats
    } catch (error) {
      throw error
    }
  }
}

module.exports = ChatService