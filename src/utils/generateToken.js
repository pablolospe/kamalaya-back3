const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }, process.env.SECRET || 'algosecreto',
  {expiresIn:'12h'})
}

module.exports = { generateToken };
