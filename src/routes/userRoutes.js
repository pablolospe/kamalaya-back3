const { Router } = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();
const { validarSignin } = require('../schemas/signin');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  console.log('caca');
  try {
    const { id } = req.params;

    const userToUpdate = await User.findByPk(id);

    const result = validarSignin(req.body);
    
    const { password } = result.data;

    result.data.hashPassword = await bcrypt.hash(password, 8);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    await userToUpdate.update(result.data);

    res.status(200).json({ message: 'Usuario actualizado con éxito', user: userToUpdate });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
