const { DataTypes } = require('sequelize');
const {diaSemana} = require('../utils/diaSemana')

module.exports = (sequelize) => {
  sequelize.define(
    'Disponibilidades',
    {
      disponibilidad_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      diaSemana: {
        type: DataTypes.ENUM(Object.values(diaSemana)),
        // allowNull: false
      },
      horaInicio: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      horaFin: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      // tipoDeAcomp: {
      //   type: DataTypes.ENUM("presencial", "telefonico", "admisiones"),
      // },
    },
    {
      timestamps: false,
    }
    // {
    //   paranoid: true,
    // }
  );
};
