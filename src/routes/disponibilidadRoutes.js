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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const disponibilidadABorrar = await Disponibilidades.findByPk(id);
    if (!disponibilidadABorrar) res.status(200).send('Disponibilidad horaria no encontrada');
    else {
      await disponibilidadABorrar.destroy();
      res
      .status(200)
        .json(
          `Disponibilidad horaria ${disponibilidadABorrar.disponibilidad_id} borrada con éxito.`
          );
        }
      } catch (error) {
        res.status(404).json(error);
      }
    });
    
  router.get('/', async (req, res) => {
    try {
      const disponibilidades = await Disponibilidades.findAll();
      res.status(200).json(disponibilidades);
    } catch (error) {
      res.status(404).json(error);
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