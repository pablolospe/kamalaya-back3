const { Router } = require('express');
const { Voluntario, Paciente, Grupo } = require('../db/db');
const { validarGrupo } = require('../schemas/grupo');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarGrupo(req.body);
console.log(result);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    const nuevoGrupo = {
      ...result,
    };

    console.log(nuevoGrupo);

    // Utiliza await para esperar a que la operación de creación se complete
    const grupoCreado = await Grupo.create(nuevoGrupo.data);

    // Responde al cliente después de que se haya creado el grupo
    res.status(200).json({ nuevoGrupo: grupoCreado });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const grupos = await Grupo.findAll();
    res.status(200).json(grupos);
  } catch (error) {
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
//     const data = req.body;
//     const usuario = await Usuario.findByPk(id);

//     await usuario.update(data);
//     res.status(200).json(usuario);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

module.exports = router;