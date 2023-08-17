const z = require('zod');

const disponibilidadSchema = z.object({
  usuario_id: z.number(),
  diaSemana: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Sábado', 'Domingo']),
  horaInicio: z.number(),
  horaFin: z.number(),
});

function validarDisponibilidad(object) {
  return disponibilidadSchema.safeParse(object);
}

module.exports = { validarDisponibilidad };


