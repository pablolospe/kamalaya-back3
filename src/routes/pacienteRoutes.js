const { Router } = require('express');
const { Disponibilidades, Usuario } = require('../db/db');
const { validarPaciente } = require('../schemas/paciente');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarPaciente(req.body);
    // console.log(result.error);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevoPaciente = {
      ...result,
    };
    console.log(nuevoPaciente);
    Disponibilidades.create(nuevoPaciente.data);
    res.status(200).json({ nuevoPaciente });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const disponibilidadABorrar = await Disponibilidades.findByPk(id);
//     if (!disponibilidadABorrar) res.status(200).send('Disponibilidad horaria no encontrada');
//     else {
//       await disponibilidadABorrar.destroy();
//       res
//       .status(200)
//         .json(
//           `Disponibilidad horaria ${disponibilidadABorrar.disponibilidad_id} borrada con éxito.`
//           );
//         }
//       } catch (error) {
//         res.status(404).json(error);
//       }
//     });
    
//     // // router.get('/:id', async (req, res) => {
//     // //   try {
//     // //     const { id } = req.params;
//     // //     const usuario = await Usuario.findByPk(id);
//     // //     res.status(200).json(usuario);
//     // //   } catch (error) {
//     // //     res.status(404).json(error);
//     // //   }
//     // // });

// // router.put('/:id', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const data = req.body;
// //     const usuario = await Usuario.findByPk(id);

// //     await usuario.update(data);
// //     res.status(200).json(usuario);
// //   } catch (error) {
// //     res.status(404).json(error);
// //   }
// // });

module.exports = router;