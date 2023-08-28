const z = require('zod');

const antecedentesPatologicosSchema = z.object({
  tipoPatologia: z.string(),
  descripcion: z.string(),
  fechaDiagnostico: z.coerce.date(),
  tratamientoActual: z.string(),
  alergias: z.string(),
  medicacion: z.string(),
  voluntario_id: z.any(),
});

function validarAntecedentesPatologicos(object) {
  return antecedentesPatologicosSchema.safeParse(object);
}

module.exports = { validarAntecedentesPatologicos };