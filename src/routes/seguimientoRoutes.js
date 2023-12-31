const { Router } = require('express');
const { Seguimiento, Voluntario, SeguimientoVoluntario } = require('../db/db');
const { validarSeguimiento } = require('../schemas/seguimiento');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { voluntario_id } = req.body;
    const result = validarSeguimiento(req.body);
    // console.log(result.error);

    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevoSeguimiento = {
      ...result,
    };

    // Seguimiento.create(nuevoSeguimiento.data);
    const seguimiento = await Seguimiento.create(nuevoSeguimiento.data)

    
    if (voluntario_id && Array.isArray(voluntario_id)) {
      for (const idVoluntario of voluntario_id) {
        const voluntario = await Voluntario.findByPk(idVoluntario);
        if (voluntario) {
          // Crea una entrada en la tabla GrupoVoluntario para asociar el grupo y el voluntario
          // console.log('aidi'+grupo.grupo_id);
          await SeguimientoVoluntario.create({
            seguimiento_id: seguimiento.seguimiento_id,
            voluntario_id: voluntario.voluntario_id,
          });
        }
      }
    }

    res.status(200).json({ nuevoSeguimiento });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const pacientes = await Paciente.findAll();
//     res.status(200).json(pacientes);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });
    
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const seguimientos = await Seguimiento.findAll({
      where: {paciente_id: id}
    });
    res.status(200).json(seguimientos);
  } catch (error) {
    res.status(404).json(error);
  }
});

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const pacienteABorrar = await Paciente.findByPk(id);
//     if (!pacienteABorrar) res.status(200).send('Voluntario no encontrado');
//     else {
//       await pacienteABorrar.destroy();
//       res
//         .status(200)
//         .json(
//           `Paciente ${pacienteABorrar.nombre} ${pacienteABorrar.apellido} (${pacienteABorrar.email}) borrado/a con éxito.`
//         );
//     }
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     const pacienteAActualizar = await Paciente.findByPk(id);

//     const result = validarPaciente(req.body);

//     if (result.error) {
//       console.log(result.error);
//       return res.status(400).json({ error: JSON.parse(result.error) });
//     }
    
//     await pacienteAActualizar.update(result.data);
//     res.status(200).json({ message: 'Paciente actualizado con éxito', paciente: pacienteAActualizar });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json(error.message);
//   }
// });

module.exports = router;