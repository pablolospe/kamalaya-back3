const { Router } = require('express');
const { AntecedenteDeAcompaniamiento, Usuario } = require('../db/db');
const { validarAntecedentesDeAcompaniamiento } = require('../schemas/antecedentesDeAcompaniamiento.js');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarAntecedentesDeAcompaniamiento(req.body);
    // console.log(result.error);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevaAntecedenteDeAcompaniamiento = {
      ...result,
    };
    console.log(nuevaAntecedenteDeAcompaniamiento);
    AntecedenteDeAcompaniamiento.create(nuevaAntecedenteDeAcompaniamiento.data);
    res.status(200).json({ nuevaAntecedenteDeAcompaniamiento });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const antecedenteABorrar = await AntecedenteDeAcompaniamiento.findByPk(id);
    if (!antecedenteABorrar) res.status(200).send('Antecedente de acompañamiento no encontrad');
    else {
      await antecedenteABorrar.destroy();
      res
      .status(200)
        .json(
          `Antecedente de acompañamiento ${antecedenteABorrar.antecedente_acompaniamiento_id} borrado con éxito.`
          );
        }
      } catch (error) {
        res.status(404).json(error);
      }
    });
    
    // // router.get('/:id', async (req, res) => {
    // //   try {
    // //     const { id } = req.params;
    // //     const usuario = await Usuario.findByPk(id);
    // //     res.status(200).json(usuario);
    // //   } catch (error) {
    // //     res.status(404).json(error);
    // //   }
    // // });

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