const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'HistorialEnKamalaya',
    {
      historial_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // paciente_id: {
      //   type: DataTypes.STRING,
      //   // allowNull: false
      // },
      fechaInicio: {
        type: DataTypes.DATEONLY,
        // allowNull: false
      },
      fechaFin: {
        type: DataTypes.DATEONLY,
        // allowNull: false
      },
      detalles: {
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
