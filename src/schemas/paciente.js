const z = require('zod');
const { nullableUndefinedDateSchema } = require('../utils/nullableUndefinedDateSchema');

const pacienteSchema = z.object({
  voluntario_id: z.number(),
  fechaAlta: nullableUndefinedDateSchema,
  fechaBaja: nullableUndefinedDateSchema,
  cuidadorPrincipal: z.string(),
  telefonoCuidadorPrincipal: z.string(),
  insumosPrestados: z.string(),
  
  nombre: z.string({
    invalid_type_error: 'El nombre debe ser un string',
    required_error: 'El nombre es requerido'
  }).toLowerCase(),
  apellido: z.string({
    invalid_type_error: 'El apellido debe ser un string',
    required_error: 'El apellido es requerido'
  }).toLowerCase(),
  genero: z.enum(['','M', 'F', 'otro']),
  fechaDeNacimiento: z.coerce.date(),
  dni: z.string(),
  email: z.string(),
  telefono: z.string(),
  telefono2: z.string(),
  lat: z.string(),
  lng: z.string(),
  calle: z.string(),
  numero: z.string(),
  localidad: z.string(),
  provincia: z.string(),
  pais: z.string(),
  codigoPostal: z.string(),

  obraSocial: z.string(),
  ocupacionProfesionHobbie: z.string(),
  situacionEconomica: z.string(),
  situacionHabitacional: z.string(),

  quienDeriva: z.string(), 
  contactoQuienDeriva: z.string(), 
  diagnostico: z.string(),
  fechaDeDiagnostico: nullableUndefinedDateSchema,
  enfermedadActual: z.string(),
  ECOGbasal: z.enum(["","0","1","2","3","4","5"]),
  antecedentesEnfermedadesPrevias: z.string(),
  medicacionActual: z.string(), 
  equipoSeguimiento: z.string(),

  pacienteConoceDiagnostico: z.enum(["","Si","No","Falta preguntar"]),
  pacienteConocePronostico: z.enum(["","Si","No","Falta preguntar"]),
  familiaConoceDiagnostico: z.enum(["","Si","No","Falta preguntar"]),
  familiaConocePronostico: z.enum(["","Si","No","Falta preguntar"]),

  problemasActuales: z.string(),
  recursosDisponibles: z.string(),
  recursosAExplotar: z.string(),
  
  familia: z.string(),

});

function validarPaciente(object) {
  return pacienteSchema.safeParse(object);
}

module.exports = { validarPaciente };



// "paciente_id": "type: DataTypes.INTEGER",
// "supervisor": "SERIA voluntario_id 1:type: DataTypes.INTEGER",
// "fechaAlta": type: DataTypes.DATEONLY,
// "fechaBaja": type: DataTypes.DATEONLY,
// "cuidadorPrincipal": "type: DataTypes.STRING",
// "telefonoCuidadorPrincipal": "type: DataTypes.STRING",
// "insumosPrestados": "type: DataTypes.STRING",
// "voluntariosQueAcompañan": ""SERIA" voluntario_id con TABLA INTERMEDItype: DataTypes.INTEGER",

// "nombre": "type: DataTypes.STRING",
// "apellido": "type: DataTypes.STRING",
// "genero": "type: DataTypes.ENUM(Object.values(generos))",
// "fechaDeNacimiento": "type: DataTypes.DATEONLY",
// "dni": "type: DataTypes.STRING",
// "email": "type: DataTypes.STRING",
// "telefono": "type: DataTypes.STRING",
// "telefono2": "type: DataTypes.STRING",
// "lat": "type: DataTypes.STRING",
// "lng": "type: DataTypes.STRING",
// "calle": "type: DataTypes.STRING",
// "numero": "type: DataTypes.STRING",
// "localidad": "type: DataTypes.STRING",
// "provincia": "type: DataTypes.STRING",
// "pais": "type: DataTypes.STRING",
// "codigoPostal": "type: DataTypes.STRING",

// "SECCION" R"ECURSO"S
// "obraSocial": "type: DataTypes.STRING",
// "ocupacionProfesionHobbie": "type: DataTypes.STRING",
// "situacionEconomica": "type: DataTypes.STRING",
// "situacionHabitacional": "type: DataTypes.STRING",

// "RESUMEN" C"LÍNIC"O
// "quienDeriva": "type: DataTypes.STRING",
// "contactoQuienDeriva": "type: DataTypes.STRING",
// "enfermedadActual": "type: DataTypes.TEXT",
// "ECOGbasal": "type: DataTypes.ENUM([1,2,3,4,5])",
// "antecedentesEnfermedadesPrevias": "type: DataTypes.STRING",
// "medicacionActual": "type: DataTypes.STRING",
// "equipoSeguimiento": "type: DataTypes.STRING",

// "DIAGNÓSTICO"
// "pacienteConoceDiagnostico": "type: DataTypes.BOOLEAN",
// "pacienteConocePronostico": "type: DataTypes.BOOLEAN",
// "familiaConoceDiagnostico": "type: DataTypes.BOOLEAN",
// "familiaConocePronostico": "type: DataTypes.BOOLEAN",

// "problemasActuales": "type: DataTypes.STRING",
// "recursosDisponibles": "type: DataTypes.STRING",
// "recursosAExplotar": "type: DataTypes.STRING",

// "familia": "type: DataTypes.TEXT," 

