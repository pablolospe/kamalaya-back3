const { Router } = require('express');
const { Voluntario, Paciente, Grupo, GrupoVoluntario } = require('../db/db');
const { validarGrupo } = require('../schemas/grupo')

const router = Router();

// Ruta para crear un grupo y asociar un paciente existente
router.post('/', async (req, res) => {
  try {
    const { diaSemana, fechaDeInicio, horaInicio, horaFin, paciente_id, voluntario_id, descripcion } = req.body;
    const result = validarGrupo(req.body)
    // const { diaSemana, fechaDeInicio, horaInicio, horaFin, paciente_id, voluntario_id, descripcion } = data.data;
    // console.log(data);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    const nuevoGrupo = {
      ...result,
    };    

    const pacienteExistente = await Paciente.findByPk(paciente_id);

    if (!pacienteExistente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    const grupo = await Grupo.create(nuevoGrupo.data)
    
    // const nuevoGrupo = await Grupo.create({
    //   diaSemana, 
    //   fechaDeInicio,
    //   horaInicio,
    //   horaFin,
    //   paciente_id,
    //   descripcion
    // });
    // await nuevoGrupo.addPaciente(pacienteExistente);

    if (voluntario_id && Array.isArray(voluntario_id)) {
      for (const idVoluntario of voluntario_id) {
        const voluntario = await Voluntario.findByPk(idVoluntario);
        if (voluntario) {
          // Crea una entrada en la tabla GrupoVoluntario para asociar el grupo y el voluntario
          // console.log('aidi'+grupo.grupo_id);
          await GrupoVoluntario.create({
            grupo_id: grupo.grupo_id,
            voluntario_id: voluntario.voluntario_id,
          });
        }
      }
    }

    return res.status(201).json(nuevoGrupo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el grupo' });
  }
});

router.get('/', async (req, res) => {
  try {
    const grupos = await Grupo.findAll({
      include: [Paciente, Voluntario]
    });
    res.status(200).json(grupos);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
    
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const paciente = await Paciente.findByPk(id);
//     res.status(200).json(paciente);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const grupoABorrar = await Grupo.findByPk(id);
    if (!grupoABorrar) res.status(200).send('Grupo no encontrado');
    else {
      await grupoABorrar.destroy();
      res
        .status(200)
        .json(
          `Grupo ${grupoABorrar.grupo_id} borrado/a con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

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