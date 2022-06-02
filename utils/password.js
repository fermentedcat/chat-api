const bcrypt = require('bcrypt')

exports.validate = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  return password.match(regex)
}

exports.hash = async (password) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    throw error
  }
}

exports.match = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw error
  }
}