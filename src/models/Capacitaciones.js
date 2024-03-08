const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Capacitaciones',
    {
      capacitacion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      fecha: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
    },
    // {
    //   paranoid: true,
    // }
  );
};
