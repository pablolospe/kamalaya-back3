const z = require('zod');

const disponibilidadSchema = z.object({
  diaSemana: z.enum(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']),
  // tipo: z.enum(['telefonica', 'presencial', 'admisión']),
  // acompTelefonico: z.boolean(),
  // acompPresencial: z.boolean(),
  // admisiones: z.boolean(),
  horaInicio: z.string(),
  horaFin: z.string(),
  voluntario_id: z.any(),
});

function validarDisponibilidad(object) {
  return disponibilidadSchema.safeParse(object);
}

module.exports = { validarDisponibilidad };


