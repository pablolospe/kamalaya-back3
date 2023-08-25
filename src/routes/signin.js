const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();
const { validarSignin } = require('../schemas/signin');

router.post('/', async (req, res) => {
  const result = validarSignin(req.body);
  const {password} = result.data
  // const { nombre, apellido, email, password, role } = req.body;
  // res.json(nombre + apellido + email + password + role);
  try {
    result.data.hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create(result.data);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
});

module.exports = router;
