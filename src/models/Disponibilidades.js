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
      // usuario_id: {
      //   type: DataTypes.INTEGER,
      // },
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
    },
    {
      timestamps: false,
    }
    // {
    //   paranoid: true,
    // }
  );
};
