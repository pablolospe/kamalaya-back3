const { DataTypes } = require('sequelize');
const {diaSemana} = require('../utils/diaSemana')

module.exports = (sequelize) => {
  const Grupo = sequelize.define(
    'Grupo',
    {
      grupo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      diaSemana: {
        type: DataTypes.ENUM(Object.values(diaSemana)),
        // allowNull: false
      },
      fechaDeInicio: {
        type: DataTypes.DATEONLY,
      },
      horaInicio: {
        type: DataTypes.TIME,
      },
      horaFin: {
        type: DataTypes.TIME,
      },
    },
    {
      timestamps: false, // Si no necesitas campos de fecha y hora en esta tabla
    }
  );

  return Grupo;
};
