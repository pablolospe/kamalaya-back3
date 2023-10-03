const z = require('zod');

const voluntarioSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre debe ser un string',
  }),
  apellido: z.string(),
  // dni: z.number().int().positive(),
  dni: z.string(),
  email: z.string({ required_error: 'El email es requerido' }),
  telefono: z.string(),
  telefono2: z.string(),
  calle: z.string(),
  numero: z.string(),
  localidad: z.string(),
  provincia: z.string(),
  pais: z.string(),
  codigoPostal: z.string(),
  telefonoEmergencia: z.string(),
  nombreContactoEmergencia: z.string(),
  genero: z.enum(['M', 'F', 'otro']),
  profesion_oficio_ocupacion: z.string(),
  hobbies_habilidades: z.string(),
  fechaDeNacimiento: z.coerce.date(),
  fechaAlta: z.coerce.date(),
  fechaBaja: z.coerce.date(),
  tieneAuto: z.boolean(),
  experienciaCP: z.boolean(),
});

function validarVoluntario(object) {
  return voluntarioSchema.safeParse(object);
}

module.exports = { validarVoluntario };


