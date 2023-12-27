const { DataTypes } = require('sequelize');

const tipoDeSeguimiento = {
  LLAMADA:'llamada',
  VISITA:'visita',
}

module.exports = (sequelize) => {
  sequelize.define(
    'SeguimientoPaciente',
    {
      visita_id: {
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
// RELACION A VOLUNTARIOS
      // voluntarios: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      timestamps: false,
    },
    {
      paranoid: true,
    }
  );
};
