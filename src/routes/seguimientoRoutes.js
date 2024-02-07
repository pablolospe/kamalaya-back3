const { Router } = require('express');
const { Seguimiento, Voluntario, SeguimientoVoluntario, Paciente } = require('../db/db');
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

router.get('/', async (req, res) => {
  try {
    const seguimientos = await Seguimiento.findAll();
    res.status(200).json(seguimientos);
  } catch (error) {
    res.status(404).json(error);
  }
});
    
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const seguimientoABorrar = await Seguimiento.findByPk(id);
    if (!seguimientoABorrar) res.status(200).send('Voluntario no encontrado');
    else {
      await seguimientoABorrar.destroy();
      res
        .status(200)
        .json(
          `Seguimiento ${seguimientoABorrar.seguimiento_id} borrado con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: result, error } = validarSeguimiento(req.body)
    const { paciente_id, voluntario_id } = req.body;
    console.log(result);
    if (error) {
      return res.status(400).json({ error: error.message }); 
    }
    
    const pacienteExistente = await Paciente.findByPk(paciente_id);
    
    if (!pacienteExistente) {
      console.log(id, paciente_id, voluntario_id);
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    const seguimientoAEditar = await Seguimiento.findByPk(id);
    await seguimientoAEditar.update(result);

    await SeguimientoVoluntario.destroy({
      where: {
        seguimiento_id: id
      }
    });

    if (voluntario_id && Array.isArray(voluntario_id)) {
      for (const idVoluntario of voluntario_id) {
        const voluntario = await Voluntario.findByPk(idVoluntario);
        if (!voluntario) {
          return res.status(404).json({ error: 'Voluntario no encontrado para el id: ' + idVoluntario });
        }
        await SeguimientoVoluntario.create({
          seguimiento_id: id,
          voluntario_id: voluntario.voluntario_id,
        });
      }
    }
    res.status(200).json(seguimientoAEditar);
  } catch (error) {
    res.status(404).json(error);
  }
});






// router.put('/:id', async (req, res) => {
//   try {
//     const { voluntario_id } = req.body;
//     const { id } = req.params;
//     console.log(id);
//     const seguimientoAActualizar = await Seguimiento.findByPk(id);

//     const result = validarSeguimiento(req.body);

//     if (result.error) {
//       console.log(result.error);
//       return res.status(400).json({ error: JSON.parse(result.error) });
//     }

//     if (voluntario_id && Array.isArray(voluntario_id)) {
//       for (const idVoluntario of voluntario_id) {
//         const voluntario = await Voluntario.findByPk(idVoluntario);
//         if (voluntario) {
//           // Crea una entrada en la tabla GrupoVoluntario para asociar el grupo y el voluntario
//           // console.log('aidi'+grupo.grupo_id);
//           await SeguimientoVoluntario.update({
//             seguimiento_id: id,
//             voluntario_id: voluntario.voluntario_id,
//           });
//         }
//       }
//     }
    
//     await seguimientoAActualizar.update(result.data);
//     res.status(200).json({ message: 'Seguimiento actualizado con éxito', seguimiento: seguimientoAActualizar });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json(error.message);
//   }
// });

module.exports = router;