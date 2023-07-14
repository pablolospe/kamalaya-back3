const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'AntecedenteDeAcompañamiento',
    {
      antecedente_acompañamiento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      institucion: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      tareasRealizadas: {
        type: DataTypes.STRING,
      },
      fechaInicio: {
        type: DataTypes.DATEONLY,
      },
      fechaFin: {
        type: DataTypes.DATEONLY,
      },
      detalles: {
        type: DataTypes.TEXT,
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
