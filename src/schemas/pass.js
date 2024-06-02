const z = require('zod');

const passSchema = z.object({
  oldPassword: z.string({ required_error: 'El password es requerido'}),
  newPassword: z.string({ required_error: 'El nuevo password es requerido'}),
});

function validarPass(object) {
  return passSchema.safeParse(object);
}

module.exports = { validarPass };


