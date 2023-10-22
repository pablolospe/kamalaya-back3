const { Router } = require('express');
// const bcrypt = require('bcrypt');
const { User } = require('../db/db');
const router = Router();
// const { validarSignin } = require('../schemas/signin');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
