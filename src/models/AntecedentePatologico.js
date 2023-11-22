const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'AntecedentePatologico',
    {
      antecedente_patologico_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipoPatologia: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      fechaDiagnostico: {
        type: DataTypes.DATEONLY,
      },
      tratamientoActual: {
        type: DataTypes.TEXT,
      },
      alergias: {
        type: DataTypes.TEXT,
      },
      medicacion: {
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
