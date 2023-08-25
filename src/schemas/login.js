const z = require('zod');

const loginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Nombre debe ser un string',
  }),
  password: z.string(),
});

function validarLogin(object) {
  return loginSchema.safeParse(object);
}

module.exports = { validarLogin };


