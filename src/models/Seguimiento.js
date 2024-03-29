const { DataTypes } = require('sequelize');

const tipoDeSeguimiento = {
  LLAMADA:'llamada',
  VISITA:'visita',
}

module.exports = (sequelize) => {
  sequelize.define(
    'Seguimiento',
    {
      seguimiento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
      },
      horaInicio: {
        type: DataTypes.STRING,
      },
      horaFin: {
        type: DataTypes.STRING,
      },
      evolucion: {
        type: DataTypes.TEXT,
      },
      llamadaOVisita: {
        type: DataTypes.ENUM(Object.values(tipoDeSeguimiento)),
      },
      problemasActualesYNecesidades: {
        type: DataTypes.STRING,
      },
      ECOG: {
        type: DataTypes.ENUM(["","0","1","2","3","4","5"]),
      },
      paciente_id: {
        type: DataTypes.INTEGER,
      },
      // RELACION A VOLUNTARIOS
    },
    {
      timestamps: false,
    },
    {
      paranoid: true,
    }
  );
};
