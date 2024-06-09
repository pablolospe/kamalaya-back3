const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();
const { validarSignin } = require('../schemas/signin');

router.post('/', async (req, res) => {
  const result = validarSignin(req.body);
  if (result.error) {
    // Extraer los mensajes de error de Zod
    const errorMessages = result.error.errors.map((error) => error.message);

    // Enviar los mensajes de error al cliente con un código de estado 400
    return res.status(400).json({ errors: errorMessages });
  }

  const { email, password } = result.data;


  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({errors: 'El correo electrónico ya está en uso'});
    }

    result.data.hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create(result.data);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
});

module.exports = router;
