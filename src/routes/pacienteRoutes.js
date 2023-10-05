const { Router } = require('express');
const { Disponibilidades, Paciente } = require('../db/db');
const { validarPaciente } = require('../schemas/paciente');
const userExtractor = require('../middleware/userExtractor');

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
    Paciente.create(nuevoPaciente.data);
    res.status(200).json({ nuevoPaciente });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(404).json(error);
  }
});
    
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    res.status(200).json(paciente);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pacienteABorrar = await Paciente.findByPk(id);
    if (!pacienteABorrar) res.status(200).send('Voluntario no encontrado');
    else {
      await pacienteABorrar.destroy();
      res
        .status(200)
        .json(
          `Paciente ${pacienteABorrar.nombre} ${pacienteABorrar.apellido} (${pacienteABorrar.email}) borrado/a con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

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