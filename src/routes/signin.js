const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();

router.post('/', async (req, res) => {
  const { nombre, apellido, email, password, role } = req.body;
  // res.json(nombre + apellido + email + password + role);
  try {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      nombre,
      apellido,
      email,
      hashPassword,
      role,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
});

module.exports = router;
