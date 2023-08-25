const z = require('zod');

const signinSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre debe ser un string',
  }),
  apellido: z.string(),
  email: z.string({ required_error: 'El email es requerido', invalid_type_error: 'el email debe tener un formato correcto' }),
  role: z.string(),
  password: z.string(),
});

function validarSignin(object) {
  return signinSchema.safeParse(object);
}

module.exports = { validarSignin };


