const z = require('zod');

const passSchema = z.object({
  user_id: z.number({ required_error: 'El id es requerido'}),
  oldPassword: z.string({ required_error: 'El password es requerido'}),
  newPassword: z.string({ required_error: 'El nuevo password es requerido'}),
});

function validarPass(object) {
  return passSchema.safeParse(object);
}

module.exports = { validarPass };


