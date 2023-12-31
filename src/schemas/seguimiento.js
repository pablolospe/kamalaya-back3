const z = require('zod');

const seguimientoSchema = z.object({

  fecha: z.coerce.date(),
  horaInicio: z.string(),
  horaFin: z.string(),
  evolucion: z.string(),
  llamadaOVisita: z.enum(['llamada', 'visita']),
  problemasActualesYNecesidades: z.string(),
  paciente_id: z.number(),

});

function validarSeguimiento(object) {
  return seguimientoSchema.safeParse(object);
}

module.exports = { validarSeguimiento };

