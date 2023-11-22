const z = require('zod');

const vacacionesSchema = z.object({
  fechaInicio: z.coerce.date(),
  fechaFin: z.coerce.date(),
  detalles: z.string(),
  voluntario_id: z.any(),
});

function validarVacaciones(object) {
  return vacacionesSchema.safeParse(object);
}

module.exports = { validarVacaciones };