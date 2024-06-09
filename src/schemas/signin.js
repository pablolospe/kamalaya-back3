const z = require('zod');

const signinSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es requerido' }).nonempty({ message: 'El nombre no puede estar vacío' }),
  apellido: z.string({ required_error: 'El apellido es requerido' }).nonempty({ message: 'El apellido no puede estar vacío' }),
  email: z.string({ required_error: 'El email es requerido' }).nonempty({ message: 'El email no puede estar vacío' }),
  role: z.enum(['User', 'Admin']),
  password: z.string({ required_error: 'La contraseña es requerida' }).nonempty({ message: 'La contraseña no puede estar vacía' }),
});

function validarSignin(object) {
  return signinSchema.safeParse(object);
}

module.exports = { validarSignin };
