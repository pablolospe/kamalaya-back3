const { Router } = require('express');
const { Usuario } = require('../db/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const usuarios = await 
    Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
