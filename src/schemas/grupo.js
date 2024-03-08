const z = require('zod');

const grupoSchema = z.object({
  descripcion: z.string(),
  diaSemana: z.enum(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']),
  fechaDeInicio: z.coerce.date(),
  // fechaFin: z.coerce.date(),
  horaInicio: z.string(),
  horaFin: z.string(),
  paciente_id: z.number(),
  voluntario_id: z.array(z.number()),
  activo: z.boolean(),
});

function validarGrupo(object) {
  return grupoSchema.safeParse(object);
}

module.exports = { validarGrupo };