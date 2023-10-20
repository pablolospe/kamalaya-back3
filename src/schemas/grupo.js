const z = require('zod');
const { diaSemana } = require('../utils/diaSemana');

const grupoSchema = z.object({
  // diaSemana: z.enum(diaSemana),
  paciente_id: z.number(),
  voluntario_id: z.array(z.number()),
});

function validarGrupo(object) {
  return grupoSchema.safeParse(object);
}

module.exports = { validarGrupo };


// diaSemana: {
//   type: DataTypes.ENUM(Object.values(diaSemana)),
//   // allowNull: false
// },
// fechaDeInicio: {
//   type: DataTypes.DATEONLY,
// },
// horaInicio: {
//   type: DataTypes.TIME,
// },
// horaFin: {
//   type: DataTypes.TIME,
// },