const jwt = require('jsonwebtoken')

exports.create = (user) => {
  try {
    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    )
    return token
  } catch (error) {
    throw error
  }
}

exports.decode = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    return decoded
  } catch (error) {
    throw error
  }
}
