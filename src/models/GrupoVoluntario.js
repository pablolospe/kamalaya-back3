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
