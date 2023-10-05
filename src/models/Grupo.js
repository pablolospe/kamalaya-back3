const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define(
    'Grupo',
    {
      grupo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      voluntario_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        foreignKey: true,
      },
    },
    // {
    //   paranoid: true,
    // }
  );
};
