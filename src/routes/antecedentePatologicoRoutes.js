const { Router } = require('express');
const { AntecedentePatologico, Usuario } = require('../db/db');
const { validarAntecedentesPatologicos } = require('../schemas/antecedentesPatologicos');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = validarAntecedentesPatologicos(req.body);
    // console.log(result.error);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const nuevoAntecedentePatologico = {
      ...result,
    };
    console.log(nuevoAntecedentePatologico);
    AntecedentePatologico.create(nuevoAntecedentePatologico.data);
    res.status(200).json({ nuevoAntecedentePatologico });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const antecedenteABorrar = await AntecedentePatologico.findByPk(id);
    if (!antecedenteABorrar) res.status(200).send('Antecedente patológico no encontrado');
    else {
      await antecedenteABorrar.destroy();
      res
      .status(200)
        .json(
          `Antecedente patológico ${antecedenteABorrar.antecedente_patologico_id} borrado con éxito.`
          );
        }
      } catch (error) {
        res.status(404).json(error);
      }
    });
    

module.exports = router;