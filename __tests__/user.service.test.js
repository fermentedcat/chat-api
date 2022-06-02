require('dotenv').config()
const { mongoose, connect } = require('../config/__test__.db')
const UserService = require('../services/user.service')
const token = require('../utils/token')
const userService = new UserService()

describe('Testing userService', () => {
  beforeAll(() => {
    connect()
  })
  
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect()
  })

  let newUser
  test('createNew returns token with new user', async () => {
    const userData = {
      fullName: 'Jane Doe',
      username: 'jenny',
      email: 'jenny@example.com',
      password: 'secr3tPassw0rd'
    }
    userToken = await userService.createNew(userData)
    const newUser = token.decode(userToken)
    expect(newUser.username).toBe('jenny')
  })

  test('findAll returns array with user', async () => {
    const users = await userService.findAll()
    newUser = users[0]
    expect(users[0].username).toBe('jenny')
  })

  test('findById returns user obj', async () => {
    const user = await userService.findById(newUser._id)
    expect(user.email).toBe('jenny@example.com')
  })

  test('update sent by user returns updated user obj', async () => {
    const reqUser = {
      userId: newUser._id,
      role: newUser.role
    }
    const updateData = {
      username: 'jane'
    }
    const updated = await userService.update(reqUser, newUser._id, updateData)
    expect(updated.username).toBe('jane')
    expect(updated.fullName).toBe(newUser.fullName)
  })

  test('update on user sent by other user throws error', async () => {
    const anotherUserData = {
      fullName: 'Bob Ross',
      username: 'bobby',
      email: 'bob@ross.com',
      password: 'secr3tPassw0rd'
    }
    const anotherUserToken = await userService.createNew(anotherUserData)
    const anotherUser = token.decode(anotherUserToken)
    expect(anotherUser.username).toBe('bobby')

    const updateData = {
      username: 'bobbo'
    }
    let errorMessage
    try {
      await userService.update(anotherUser, newUser._id, updateData)
    } catch (err) {
      errorMessage = err.message
    }
    expect(errorMessage).toBe('Not authorized.')
  })

  test('delete user sent by admin returns user', async () => {
    const reqUser = {
      userId: '618b9e8cce54c112b202217b',
      role: 'admin'
    }
    
    const deleted = await userService.delete(reqUser, newUser._id)
    expect(deleted.fullName).toBe(newUser.fullName)
  })
})