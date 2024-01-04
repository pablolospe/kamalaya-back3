const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const CapacitacionVoluntario = sequelize.define(
    'CapacitacionVoluntario',
    {
      capacitacion_id: {
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

  return CapacitacionVoluntario;
};
