const { DataTypes } = require('sequelize');

// Tabla intermedia entre Seguimiento (de cada paciente) y Voluntario, los voluntarios participantes

module.exports = (sequelize) => {
  const SeguimientoVoluntario = sequelize.define(
    'SeguimientoVoluntario',
    {
      seguimiento_id: {
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

  return SeguimientoVoluntario;
};
