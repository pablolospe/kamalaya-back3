const { DataTypes } = require('sequelize');

const generos = {
  M:'M',
  F:'F',
  OTRO:"otro",
  '':''
}

module.exports = (sequelize) => {
  
  sequelize.define(
    'Paciente',
    {
      paciente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fechaAlta: {
        type: DataTypes.DATEONLY,
      },
      fechaBaja: {
        type: DataTypes.DATEONLY,
      },
      cuidadorPrincipal: {
        type: DataTypes.STRING,
      },
      telefonoCuidadorPrincipal: {
        type: DataTypes.STRING,
      },
      insumosPrestados: {
        type: DataTypes.STRING,
      },
      voluntariosQueAcompañan: {
        // SERIA voluntario_id con TABLA INTERMEDIA
        type: DataTypes.INTEGER,
      },

      nombre: {
        type: DataTypes.STRING,
      },
      apellido: {
        type: DataTypes.STRING,
      },
      genero: {
        type: DataTypes.ENUM(Object.values(generos)),
      },
      fechaDeNacimiento: {
        type: DataTypes.DATEONLY,
      },
      dni: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      telefono2: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.STRING,
      },
      lng: {
        type: DataTypes.STRING,
      },
      calle: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.STRING,
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
      
      // SECCION RECURSOS
      obraSocial: {
        type: DataTypes.STRING,
      },
      ocupacionProfesionHobbie: {
        type: DataTypes.STRING,
      },
      situacionEconomica: {
        type: DataTypes.STRING,
      },
      situacionHabitacional: {
        type: DataTypes.STRING,
      },

      // RESUMEN CLÍNICO
      quienDeriva: {
        type: DataTypes.STRING,
      },
      contactoQuienDeriva: {
        type: DataTypes.STRING,
      },
      enfermedadActual: {
        type: DataTypes.TEXT,
      },
      ECOGbasal: {
        type: DataTypes.ENUM(["","1","2","3","4","5"]),
      },
      antecedentesEnfermedadesPrevias: {
        type: DataTypes.STRING,
      },
      medicacionActual: {
        type: DataTypes.STRING,
      },
      equipoSeguimiento: {
        type: DataTypes.STRING,
      },

      // DIAGNÓSTICO
      pacienteConoceDiagnostico: {
        type: DataTypes.ENUM(["","Si","No","Falta preguntar"]),
        allowNull: true, 
      },
      pacienteConocePronostico: {
        type: DataTypes.ENUM(["","Si","No","Falta preguntar"]),
      },
      familiaConoceDiagnostico: {
        type: DataTypes.ENUM(["","Si","No","Falta preguntar"]),
      },
      familiaConocePronostico: {
        type: DataTypes.ENUM(["","Si","No","Falta preguntar"]),
      },
      
      problemasActuales: {
        type: DataTypes.STRING,
      },
      recursosDisponibles: {
        type: DataTypes.STRING,
      },
      recursosAExplotar: {
        type: DataTypes.STRING,
      },

      familia: {
        type: DataTypes.TEXT,
      },
      estáActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, 
    // {
    //   paranoid: true,
    // }
  );
};
