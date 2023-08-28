const { Router } = require('express');
const { Voluntario, Disponibilidades, AntecedenteDeAcompaniamiento, AntecedentePatologico, Op } = require('../db/db');
const { validarVoluntario } = require('../schemas/voluntario');
const { validarDisponibilidad } = require('../schemas/disponibilidad');

const router = Router();

// router.get('/', async (req, res) => {
//   try {
//     const { nombre, apellido, localidad, tieneAuto, experienciaCP, profesion_oficio_ocupacion, hobbies_habilidades } = req.query;
    
//     const filter = {};
//     console.log(filter);
//     if (nombre) {
//       filter.nombre = { [Op.iLike]: `%${nombre}%` }; // Case-insensitive search
//     }
//     if (apellido) {
//       filter.apellido = { [Op.iLike]: `%${apellido}%` };
//     }
//     if (localidad) {
//       filter.localidad = { [Op.iLike]: `%${localidad}%` };
//     }
//     if (profesion_oficio_ocupacion) {
//       filter.profesion_oficio_ocupacion = { [Op.iLike]: `%${profesion_oficio_ocupacion}%` };
//     }
//     if (hobbies_habilidades) {
//       filter.hobbies_habilidades = { [Op.iLike]: `%${hobbies_habilidades}%` };
//     }
//     if (tieneAuto && tieneAuto !== undefined) {
//       filter.tieneAuto = tieneAuto === 'true' ? true : false;
//     }
//     if (experienciaCP && experienciaCP !== undefined) {
//       filter.experienciaCP = experienciaCP === 'true' ? true : false;
//     }
//     const voluntarios = await Voluntario.findAll({
//       where: filter,
//       include: Disponibilidades
//     });
    
//     res.status(200).json(voluntarios);
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const voluntario = await Voluntario.findByPk(id, {
      include: [ Disponibilidades, AntecedenteDeAcompaniamiento, AntecedentePatologico],
    }, 
    
    );
    res.status(200).json(voluntario);
  } catch (error) {
    res.status(404).json(error);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const result = validarVoluntario(req.body);
//     console.log(result.error);

//     if (result.error) {
//       return res.status(400).json({ error: JSON.parse(result.error) });
//     }
//     const nuevoVoluntario = {
//       ...result,
//     };
//     console.log(nuevoVoluntario);
//     Voluntario.create(nuevoVoluntario.data);
//     res.status(200).json({ nuevoVoluntario });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const result = validarVoluntario(req.body);
    console.log(req.body);
    const disponibilidades = req.body.Disponibilidades[0]

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error) });
    }

    const nuevoVoluntario = {
      ...result,
    };    
    // Crear el voluntario y obtener su ID
    const voluntarioCreado = await Voluntario.create(nuevoVoluntario.data);
    console.log('voluntarioCreado.voluntario_id: '+ voluntarioCreado.voluntario_id);

    // Luego, usar el voluntario_id para crear la disponibilidad
    const result2 = validarDisponibilidad(disponibilidades);

    const nuevaDisponibilidad = {
      voluntario_id: Number(voluntarioCreado.voluntario_id), // Asignar el voluntario_id
      ...result2.data,
    };

    const disponibilidadValidada = validarDisponibilidad(nuevaDisponibilidad);

    await Disponibilidades.create(disponibilidadValidada.data);

    res.status(200).json({ nuevoVoluntario, nuevaDisponibilidad });
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
    const data = req.body;
    const voluntario = await Voluntario.findByPk(id);

    await voluntario.update(data);
    res.status(200).json(voluntario);
  } catch (error) {
    res.status(404).json(error);
  }
});



router.get('/', async (req, res) => {
  try {
    const { nombre, apellido, localidad, tieneAuto, experienciaCP, profesion_oficio_ocupacion, hobbies_habilidades, diaSemana } = req.query;
    
    console.log(diaSemana);
    
    const filter = {};
    
    if (nombre) {
      filter.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (apellido) {
      filter.apellido = { [Op.iLike]: `%${apellido}%` };
    }
    if (localidad) {
      filter.localidad = { [Op.iLike]: `%${localidad}%` };
    }
    if (profesion_oficio_ocupacion) {
      filter.profesion_oficio_ocupacion = { [Op.iLike]: `%${profesion_oficio_ocupacion}%` };
    }
    if (hobbies_habilidades) {
      filter.hobbies_habilidades = { [Op.iLike]: `%${hobbies_habilidades}%` };
    }
    if (tieneAuto !== undefined) {
      filter.tieneAuto = tieneAuto === 'true';
    }
    if (experienciaCP !== undefined) {
      filter.experienciaCP = experienciaCP === 'true';
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
        include: Disponibilidades,
      });
    }

    res.status(200).json(voluntarios);
  } catch (error) {
    res.status(404).json(error);
  }
});


module.exports = router;