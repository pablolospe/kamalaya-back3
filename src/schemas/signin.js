const z = require('zod');

const signinSchema = z.object({
  nombre: z.string({ required_error: 'El email es requerido', invalid_type_error: 'el email debe tener un formato correcto' }),
  apellido: z.string({ required_error: 'El email es requerido', invalid_type_error: 'el email debe tener un formato correcto' }),
  email: z.string({ required_error: 'El email es requerido', invalid_type_error: 'el email debe tener un formato correcto' }),
  role: z.enum(['User', 'Admin']),
  password: z.string({ required_error: 'El email es requerido'}),
});

function validarSignin(object) {
  return signinSchema.safeParse(object);
}

module.exports = { validarSignin };


