const { decode } = require("../utils/token")

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied.')
    
    const user = decode(token)
    if (user.role !== 'admin') return res.status(401).send('Access denied.')
    
    req.user = user
    next()
  } catch (error) {
    res.status(401).send('Invalid token')
  }
}