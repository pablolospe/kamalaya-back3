const z = require('zod');

const capacitacionSchema = z.object({

  fecha: z.coerce.date(),
  nombre: z.string(),
  descripcion: z.string(),
  voluntario_id: z.array(z.number()),
});

function validarCapacitacion(object) {
  return capacitacionSchema.safeParse(object);
}

module.exports = { validarCapacitacion };

