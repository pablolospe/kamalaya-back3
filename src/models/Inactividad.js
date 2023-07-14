const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Inactividad',
    {
      inactividad_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
