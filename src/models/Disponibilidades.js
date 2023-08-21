const { DataTypes } = require('sequelize');

const DiaSemanaEnum = {
  LUNES: 'Lunes',
  MARTES: 'Martes',
  MIERCOLES: 'Miércoles',
  JUEVES: 'Jueves',
  VIERNES: 'Viernes',
  SABADO: 'Sábado',
  DOMINGO: 'Domingo',
};

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
        type: DataTypes.ENUM(Object.values(DiaSemanaEnum)),
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
