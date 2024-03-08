const { Router } = require('express');
const { Capacitaciones, Voluntario, CapacitacionVoluntario } = require('../db/db');
// const { Capacitaciones, Voluntario, CapacitacionVoluntario } = require('../db/db');
const { validarCapacitacion } = require('../schemas/capacitacion');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { voluntario_id } = req.body;
    const result = validarCapacitacion(req.body);
    // console.log(result.error);

    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevaCapacitacion = {
      ...result,
    };

    const capacitacion = await Capacitaciones.create(nuevaCapacitacion.data);

    if (voluntario_id && Array.isArray(voluntario_id)) {
      for (const idVoluntario of voluntario_id) {
        const voluntario = await Voluntario.findByPk(idVoluntario);
        if (voluntario) {
          console.log(voluntario);
          // Crea una entrada en la tabla GrupoVoluntario para asociar el grupo y el voluntario
          // console.log('aidi'+grupo.grupo_id);
          await CapacitacionVoluntario.create({
            capacitacion_id: capacitacion.capacitacion_id,
            voluntario_id: voluntario.voluntario_id,
          });
        }
      }
    }

    res.status(200).json({ nuevaCapacitacion });
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

router.get('/', async (req, res) => {
  try {
    const capacitaciones = await Capacitaciones.findAll({
      include: {
        model: Voluntario,
        attributes: ['voluntario_id', 'nombre', 'apellido'] ,
      }
    });
    res.status(200).json(capacitaciones);
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
