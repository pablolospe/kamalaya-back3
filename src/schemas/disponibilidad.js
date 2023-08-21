const z = require('zod');

const disponibilidadSchema = z.object({
  diaSemana: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Sábado', 'Domingo']),
  horaInicio: z.string(),
  horaFin: z.string(),
  usuario_id: z.any(),
});

function validarDisponibilidad(object) {
  return disponibilidadSchema.safeParse(object);
}

module.exports = { validarDisponibilidad };


