const mongoose = require('mongoose');
const Schema = mongoose.Schema

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId, 
    ref: 'Chat', 
    required: true
  },
  text: {
    type: String,
  },
  photo: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);