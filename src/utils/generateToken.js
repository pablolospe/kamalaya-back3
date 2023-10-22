const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign({
    user_id: user.user_id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    role: user.role,
  }, process.env.SECRET || 'batatita',
  {expiresIn:'1h'})
}

module.exports = { generateToken };
