const { DataTypes } = require('sequelize');

const generos = {
  M:'M',
  F:'F',
  OTRO:"otro"
}
module.exports = (sequelize) => {

  sequelize.define(
    'Usuario',
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      dni: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
      },
      telefono: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      telefono2: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.INTEGER,
      },
      localidad: {
        type: DataTypes.STRING,
      },
      provincia: {
        type: DataTypes.STRING,
      },
      pais: {
        type: DataTypes.STRING,
      },
      codigoPostal: {
        type: DataTypes.STRING,
      },
      hashPassword: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      rol_usuario: {
        type: DataTypes.STRING,
      },
      telefonoEmergencia: {
        type: DataTypes.STRING,
      },
      nombreContactoEmergencia: {
        type: DataTypes.STRING,
      },
      genero: {
        type: DataTypes.ENUM(Object.values(generos)),
      },
      profesion_oficio_ocupacion: {
        type: DataTypes.STRING,
      },
      hobbies_habilidades: {
        type: DataTypes.STRING,
      },
      fechaDeNacimiento: {
        type: DataTypes.DATEONLY,
      },
      fechaAlta: {
        type: DataTypes.DATEONLY,
      },
      fechaBaja: {
        type: DataTypes.DATEONLY,
      },
      tieneAuto: {
        type: DataTypes.BOOLEAN,
      },
      experienciaCP: {
        type: DataTypes.BOOLEAN,
      },
    },
    // {
    //   paranoid: true,
    // }
  );
};
