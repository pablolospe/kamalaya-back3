const { Router } = require('express');
const { Usuario } = require('../db/db');

const router = Router();

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/usuarios', async (req, res) => {
  const data = req.body;
  try {
    console.log(data);
    const nuevoUsuario = await Usuario.create(data);
    res.status(200).json(nuevoUsuario);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioABorrar = await Usuario.findByPk(id);
    if (!usuarioABorrar) res.status(200).send('Usuario no encontrado');
    else {
      await Usuario.destroy({ where: { usuario_id: id } });
      res.status(200).json(usuarioABorrar);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/usuarios/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const data = req.body;
    const usuario = await Usuario.findByPk(id);
    
    await usuario.update(data)
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
