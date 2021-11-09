const UserService = require('../services/user.service.js')
const userService = new UserService()

exports.getAllUsers = async (req, res, next) => {
  res.send(`Get all users`)
}

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId
  res.send(`Get user by user id ${userId}`)
}

exports.addNewUser = async (req, res, next) => {
  console.log(`Add new user`)
  try {
    const user = await userService.createNew()
    res.status(202).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId
  res.send(`Update user by user id ${userId}`)
}

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId
  res.send(`Delete user by user id ${userId}`)
}