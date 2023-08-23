const { Router } = require('express');
const { Usuario, Disponibilidades, Op } = require('../db/db');
const { validarUsuario } = require('../schemas/usuario');
const { validarDisponibilidad } = require('../schemas/disponibilidad');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { nombre, apellido, localidad, tieneAuto, experienciaCP, profesion_oficio_ocupacion, hobbies_habilidades } = req.query;
    
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
    if (profesion_oficio_ocupacion) {
      filter.profesion_oficio_ocupacion = { [Op.iLike]: `%${profesion_oficio_ocupacion}%` };
    }
    if (hobbies_habilidades) {
      filter.hobbies_habilidades = { [Op.iLike]: `%${hobbies_habilidades}%` };
    }
    if (tieneAuto !== undefined) {
      filter.tieneAuto = tieneAuto === 'true' ? true : false;
    }
    if (experienciaCP !== undefined) {
      filter.experienciaCP = experienciaCP === 'true' ? true : false;
    }
    const usuarios = await Usuario.findAll({
      where: filter,
      include: Disponibilidades
    });
    
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

// router.post('/', async (req, res) => {
//   try {
//     const result = validarUsuario(req.body);
//     console.log(result.error);

//     if (result.error) {
//       return res.status(400).json({ error: JSON.parse(result.error) });
//     }
//     const nuevoUsuario = {
//       ...result,
//     };
//     console.log(nuevoUsuario);
//     Usuario.create(nuevoUsuario.data);
//     res.status(200).json({ nuevoUsuario });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const result = validarUsuario(req.body);
    console.log(req.body);
    const disponibilidades = req.body.Disponibilidades[0]

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    const nuevoUsuario = {
      ...result,
    };    
    // Crear el usuario y obtener su ID
    const usuarioCreado = await Usuario.create(nuevoUsuario.data);
    console.log('usuarioCreado.usuario_id: '+ usuarioCreado.usuario_id);

    // Luego, usar el usuario_id para crear la disponibilidad
    const result2 = validarDisponibilidad(disponibilidades);

    const nuevaDisponibilidad = {
      usuario_id: Number(usuarioCreado.usuario_id), // Asignar el usuario_id
      ...result2.data,
    };

    const disponibilidadValidada = validarDisponibilidad(nuevaDisponibilidad);

    await Disponibilidades.create(disponibilidadValidada.data);

    res.status(200).json({ nuevoUsuario, nuevaDisponibilidad });
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