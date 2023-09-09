const { Router } = require('express');
const { Vacaciones } = require('../db/db');
const { validarVacaciones } = require('../schemas/vacaciones');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarVacaciones(req.body);
    // console.log(result.error);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevasVacaciones = {
      ...result,
    };
    console.log(nuevasVacaciones);
    Vacaciones.create(nuevasVacaciones.data);
    res.status(200).json({ nuevasVacaciones });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vacacionesABorrar = await Vacaciones.findByPk(id);
    if (!vacacionesABorrar)
      res.status(200).send('Disponibilidad horaria no encontrada');
    else {
      await vacacionesABorrar.destroy();
      res
        .status(200)
        .json(
          `Disponibilidad horaria ${vacacionesABorrar.disponibilidad_id} borrada con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const usuario = await Usuario.findByPk(id);
//     res.status(200).json(usuario);
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
