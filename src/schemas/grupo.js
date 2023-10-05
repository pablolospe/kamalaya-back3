const z = require('zod');

const grupoSchema = z.object({
  paciente_id: z.number(),
  voluntario_id: z.array(z.number()),
});

function validarGrupo(object) {
  return grupoSchema.safeParse(object);
}

module.exports = { validarGrupo };


