const { Router } = require('express');
const { Usuario, Disponibilidades, Op } = require('../db/db');
const { validarUsuario } = require('../schemas/usuario');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { nombre, apellido, localidad, tieneAuto } = req.query;
    
    // Construct the filter object based on query parameters
    const filter = {};
    console.log(filter);
    if (nombre) {
      filter.nombre = { [Op.iLike]: `%${nombre}%` }; // Case-insensitive search
    }
    if (apellido) {
      filter.apellido = { [Op.iLike]: `%${apellido}%` };
    }
    if (localidad) {
      filter.localidad = { [Op.iLike]: `%${localidad}%` };
    }
    if (tieneAuto) {
      filter.tieneAuto = { [Op.is]: true };
    }
    const usuarios = await Usuario.findAll({
      where: filter,
      include: Disponibilidades
    });
    // const usuarios = await Usuario.findAll({
    //   where: filter,
    //   include: {
    //     model: Disponibilidades,
    //     where: { diaSemana: 'Lunes' }, // Filtro para las disponibilidades
    //   },
    // });
    
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      include: Disponibilidades
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = validarUsuario(req.body);
    console.log(result.error);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevoUsuario = {
      ...result,
    };
    console.log(nuevoUsuario);
    Usuario.create(nuevoUsuario.data);
    res.status(200).json({ nuevoUsuario });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioABorrar = await Usuario.findByPk(id);
    if (!usuarioABorrar) res.status(200).send('Usuario no encontrado');
    else {
      await Usuario.destroy({ where: { usuario_id: id } });
      res
        .status(200)
        .json(
          `Usuario ${usuarioABorrar.nombre} ${usuarioABorrar.apellido} (${usuarioABorrar.email}) borrado con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const usuario = await Usuario.findByPk(id);

    await usuario.update(data);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;