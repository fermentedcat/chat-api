require('dotenv').config()
require('./config/db')
const app = require('./config/app')
const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})