const Db = require('../db/db');
const Message = require('../models/Message');

class MessageService {
  // Add param db for testability
  constructor(db = new Db(new Message)) {
    this.db = db
  }
  async findAllByChatId(chatId) {
    const query = [{ chatId: chatId }]
    try {
      const messages = await this.db.find(query)
      return messages
    } catch (error) {
      throw error
    }
  }
}

module.exports = MessageService