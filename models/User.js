const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);