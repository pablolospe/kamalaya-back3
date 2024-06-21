const { Router } = require('express');
const { Voluntario, Disponibilidades, AntecedenteDeAcompaniamiento, AntecedentePatologico, Vacaciones, Seguimiento, Grupo, Op } = require('../db/db');
const { validarVoluntario } = require('../schemas/voluntario');
const userExtractor = require('../middleware/userExtractor');

const router = Router();

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const voluntario = await Voluntario.findByPk(id, {
//       include: [Disponibilidades, AntecedenteDeAcompaniamiento, AntecedentePatologico, Vacaciones, Seguimiento, Grupo],
//     });

//     if (!voluntario) {
//       return res.status(404).json({ error: 'Voluntario no encontrado' });
//     }

//     const formatToISO = (date) => (date ? new Date(date).toISOString() : null);


//     const formattedVoluntario = {
//       ...voluntario.toJSON(),
//       fechaDeNacimiento: formatToISO(voluntario.fechaDeNacimiento),
//       fechaAlta: formatToISO(voluntario.fechaAlta),
//       fechaBaja: formatToISO(voluntario.fechaBaja),
//     };


//     res.status(200).json(formattedVoluntario);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el voluntario' });
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const voluntario = await Voluntario.findByPk(id, {
      include: [ Disponibilidades, AntecedenteDeAcompaniamiento, AntecedentePatologico, Vacaciones, Seguimiento, Grupo],
    }, 
    
    );
    res.status(200).json(voluntario);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = validarVoluntario(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    const nuevoVoluntario = {
      ...result,
    };    
   
    const voluntarioCreado = await Voluntario.create(nuevoVoluntario.data);
   
    res.status(200).json({ voluntarioCreado });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const voluntarioABorrar = await Voluntario.findByPk(id);
    if (!voluntarioABorrar) res.status(200).send('Voluntario no encontrado');
    else {
      await voluntarioABorrar.destroy();
      res
        .status(200)
        .json(
          `Voluntario ${voluntarioABorrar.nombre} ${voluntarioABorrar.apellido} (${voluntarioABorrar.email}) borrado con éxito.`
        );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const voluntarioAActualizar = await Voluntario.findByPk(id);

    const result = validarVoluntario(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }
    
    await voluntarioAActualizar.update(result.data);
    res.status(200).json({ message: 'Voluntario actualizado con éxito', voluntario: voluntarioAActualizar });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/', async (req, res) => {
  const token = req.headers['authorization'];
  console.log(token);
  try {
    const { nombre, apellido, localidad, tieneAuto, experienciaCP, profesion_oficio_ocupacion, hobbies_habilidades, diaSemana, activo } = req.query;
    
    const filter = {};
    
    if (nombre) {
      filter.nombre = { [Op.substring]: `%${nombre}%` };
    }
    if (apellido) {
      filter.apellido = { [Op.substring]: `%${apellido}%` };
    }
    if (localidad) {
      filter.localidad = { [Op.substring]: `%${localidad}%` };
    }
    if (profesion_oficio_ocupacion) {
      filter.profesion_oficio_ocupacion = { [Op.substring]: `%${profesion_oficio_ocupacion}%` };
    }
    if (hobbies_habilidades) {
      filter.hobbies_habilidades = { [Op.substring]: `%${hobbies_habilidades}%` };
    }
    if (tieneAuto !== undefined) {
      filter.tieneAuto = tieneAuto === 'true';
    }
    if (experienciaCP !== undefined) {
      filter.experienciaCP = experienciaCP === 'true';
    }
    if (activo !== undefined) {
      filter.activo = activo === 'true';
    }
    
    let voluntarios;
    
    if (diaSemana && diaSemana[0]) {
      const diaSemanaArray = Array.isArray(diaSemana) ? diaSemana : [diaSemana];
      
      voluntarios = await Voluntario.findAll({
        where: filter,
        include: [
          {
            model: Disponibilidades,
            where: {
              diaSemana: diaSemanaArray
            }
          }
        ]
      });
      
    } else {
      voluntarios = await Voluntario.findAll({
        where: filter,
        include: [ Disponibilidades, Vacaciones ]
      });
    }

    res.status(200).json(voluntarios);
  } catch (error) {
    res.status(404).json(error);
  }
});


module.exports = router;