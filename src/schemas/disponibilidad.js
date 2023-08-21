const z = require('zod');

const disponibilidadSchema = z.object({
  diaSemana: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Sábado', 'Domingo']),
  horaInicio: z.number(),
  horaFin: z.number(),
  usuario_id: z.any(),
});

function validarDisponibilidad(object) {
  return disponibilidadSchema.safeParse(object);
}

module.exports = { validarDisponibilidad };


