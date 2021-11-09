const mongoose = require('mongoose');
const Schema = mongoose.Schema

const chatSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  subscribers: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  private: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Chat', chatSchema);