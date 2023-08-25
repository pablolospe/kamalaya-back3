const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../controllers/utils.js');
const { User } = require('../db/db.js');
const { validarLogin } = require('../schemas/login.js');

// const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.post('/', async (req, res) => {
  const result = validarLogin(req.body)
  const { email, password } = result.data;
  
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      if (bcrypt.compareSync(password, user.hashPassword)) {
        res.send({
          id: user.user_id,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'invalid email or password' });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
