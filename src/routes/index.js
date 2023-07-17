const { Router } = require('express');
const { Usuario } = require('../db/db');

const router = Router();

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await 
    Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/usuarios', async (req, res) => {
    const data = req.body;
    try {
    console.log(data);
    const nuevoUsuario = await Usuario.create(data);
    // console.log(nuevoUsuario);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
