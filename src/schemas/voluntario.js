const z = require('zod');

const toLowerCase = (str) => str.toLowerCase();

const voluntarioSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'El nombre debe ser un string',
    required_error: 'El nombre es requerido'
  }).toLowerCase(),
  apellido: z.string({
    invalid_type_error: 'El apellido debe ser un string',
    required_error: 'El apellido es requerido'
  }).toLowerCase(),
  dni: z.string(),
  email: z.string({ required_error: 'El email es requerido' }).toLowerCase(),
  telefono: z.string(),
  telefono2: z.string(),
  calle: z.string().toLowerCase(),
  numero: z.string(),
  departamento: z.string().toLowerCase(),
  localidad: z.string().toLowerCase(),
  provincia: z.string().toLowerCase(),
  lat: z.string(),
  lng: z.string(),
  pais: z.string().toLowerCase(),
  codigoPostal: z.string(),
  telefonoEmergencia: z.string(),
  nombreContactoEmergencia: z.string().toLowerCase(),
  genero: z.enum(['M', 'F', 'otro']),
  profesion_oficio_ocupacion: z.string(),
  hobbies_habilidades: z.string(),
  fechaDeNacimiento: z.coerce.date(),
  fechaAlta: z.coerce.date(),
  fechaBaja: z.date().nullable(),
  tieneAuto: z.boolean(),
  experienciaCP: z.boolean(),
  activo: z.boolean(), // poner opcional
});

function validarVoluntario(object) {
  return voluntarioSchema.safeParse(object);
}

module.exports = { validarVoluntario };



