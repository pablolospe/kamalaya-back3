const z = require('zod');

const antecedentesDeAcompaniamientoSchema = z.object({
  institucion: z.string(),
  tareasRealizadas: z.string(),
  fechaInicio: z.coerce.date(),
  fechaFin: z.coerce.date(),
  detalles: z.string(),
  usuario_id: z.any(),
});

function validarAntecedentesDeAcompaniamiento(object) {
  return antecedentesDeAcompaniamientoSchema.safeParse(object);
}

module.exports = { validarAntecedentesDeAcompaniamiento };