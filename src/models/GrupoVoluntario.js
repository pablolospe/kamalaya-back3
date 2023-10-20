// // models/GrupoVoluntario.js
// const { DataTypes } = require('sequelize');

// const GrupoVoluntario = sequelize.define('GrupoVoluntario', {
//   grupo_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   voluntario_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// //   return GrupoVoluntario;
// });

// Define la relación muchos a muchos entre Grupo y Voluntario
// Grupo.belongsToMany(Voluntario, { through: GrupoVoluntario, foreignKey: 'grupo_id' });
// Voluntario.belongsToMany(Grupo, { through: GrupoVoluntario, foreignKey: 'voluntario_id' });
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const GrupoVoluntario = sequelize.define(
    'GrupoVoluntario',
    {
      grupo_id: {
        type: DataTypes.INTEGER,
      },
      voluntario_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false, 
    }
  );

  return GrupoVoluntario;
};
