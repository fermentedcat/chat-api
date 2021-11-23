const UserService = require('../services/user.service.js')
const userService = new UserService()

exports.authenticate = (req, res, next) => {
  res.sendStatus(200)
}

exports.login = async (req, res, next) => {
  try {
    const userData = req.body
    const token = await userService.login(userData)
    res.status(200).json(token)
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.searchUser = async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await userService.findByUsername(username)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.searchUsers = async (req, res, next) => {
  try {
    const string = req.params.string
    const user = await userService.findAllByString(string)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await userService.findById(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.addNewUser = async (req, res, next) => {
  try {
    const userData = req.body
    const token = await userService.createNew(userData)
    res.status(201).json(token)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const user = req.user
    const userId = req.params.userId
    const userData = req.body
    const updatedUser = await userService.update(user, userId, userData)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const user = req.user
    const userId = req.params.userId
    await userService.delete(user, userId)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json(error)
  }
}