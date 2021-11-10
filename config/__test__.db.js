const mongoose = require('mongoose')
const connect = () => {
  mongoose.connect(process.env.TEST_DB_URI, {
    dbName: process.env.TEST_DB_NAME,
    user: process.env.TEST_DB_USER,
    pass: process.env.TEST_DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
module.exports = {mongoose, connect}
