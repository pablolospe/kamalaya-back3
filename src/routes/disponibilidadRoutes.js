const { Router } = require('express');
const { Disponibilidades, Usuario } = require('../db/db');
const { validarDisponibilidad } = require('../schemas/disponibilidad');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarDisponibilidad(req.body);
    // console.log(result.error);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevaDisponibilidad = {
      ...result,
    };
    console.log(nuevaDisponibilidad);
    Disponibilidades.create(nuevaDisponibilidad.data);
    res.status(200).json({ nuevaDisponibilidad });
  } catch (error) {
    res.status(500).json(error);
  }
});

// // router.get('/', async (req, res) => {
// //   try {
// //     const { nombre, apellido, localidad, tieneAuto } = req.query;
    
// //     // Construct the filter object based on query parameters
// //     const filter = {};
// //     console.log(filter);
// //     if (nombre) {
// //       filter.nombre = { [Op.iLike]: `%${nombre}%` }; // Case-insensitive search
// //     }
// //     if (apellido) {
// //       filter.apellido = { [Op.iLike]: `%${apellido}%` };
// //     }
// //     if (localidad) {
// //       filter.localidad = { [Op.iLike]: `%${localidad}%` };
// //     }
// //     if (tieneAuto) {
// //       filter.tieneAuto = { [Op.is]: true };
// //     }
// //     const usuarios = await Usuario.findAll({
// //       where: filter,
// //     });
    
// //     res.status(200).json(usuarios);
// //   } catch (error) {
// //     res.status(404).json(error);
// //   }
// // });

// // router.get('/:id', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const usuario = await Usuario.findByPk(id);
// //     res.status(200).json(usuario);
// //   } catch (error) {
// //     res.status(404).json(error);
// //   }
// // });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const usuarioABorrar = await Usuario.findByPk(id);
//     if (!usuarioABorrar) res.status(200).send('Usuario no encontrado');
//     else {
//       await Usuario.destroy({ where: { usuario_id: id } });
//       res
//         .status(200)
//         .json(
//           `Usuario ${usuarioABorrar.nombre} ${usuarioABorrar.apellido} (${usuarioABorrar.email}) borrado con éxito.`
//         );
//     }
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const usuario = await Usuario.findByPk(id);

//     await usuario.update(data);
//     res.status(200).json(usuario);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

module.exports = router;