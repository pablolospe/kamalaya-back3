// const z = require('zod');

// const pacienteSchema = z.object({
//   nombre: z.string({
//     invalid_type_error: 'Nombre debe ser un string',
//   }),
//   apellido: z.string(),
//   dni: z.string(),
//   email: z.string({ required_error: 'El email es requerido' }),
//   telefono: z.string(),
//   lat: z.string(),
//   lng: z.string(),
//   calle: z.string(),
//   numero: z.string(),
//   localidad: z.string(),
//   provincia: z.string(),
//   pais: z.string(),
//   codigoPostal: z.string(),
//   telefonoEmergencia: z.string(),
//   nombreContactoEmergencia: z.string(),
//   genero: z.enum(['M', 'F', 'otro']),
//   hobbies: z.string(),
//   fechaDeNacimiento: z.coerce.date(),
//   fechaAlta: z.coerce.date(),
//   fechaBaja: z.coerce.date().nullable(),
// });

// function validarPaciente(object) {
//   return pacienteSchema.safeParse(object);
// }

// module.exports = { validarPaciente };


