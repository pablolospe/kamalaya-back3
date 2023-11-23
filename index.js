const app = require('./src/server')
const { conn } = require('./src/db/db.js');
const { Voluntario, User } = require("./src/db/db");

conn.sync({force:true}).then(() => {
    app.listen(8000, () => {
      console.log(`Server running...`);

      // const voluntario = [
      //   { nombre:"Nico", apellido:"Marra", email: "marra@s.com",telefonoEmergencia: "66666666", nombreContactoEmergencia: "Roberto Enfermero", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
      //   { nombre: "Pablo", apellido: "Lospennato", email: "yosoypxl@gmail.com", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
      //   ]

      const user = [
        {
          nombre:"Pol", apellido:"Rash", email:"p@x.l", hashPassword:"$2b$08$VsBJhQi9LndBKwrikXtjpu5B8Ywj1d5dnaWLpwr8o1j.mYFeYV9NC", role:"Admin"
        }
      ]

      //   Voluntario.bulkCreate(voluntario).then(() => console.log("Voluntarios cargados"));
        User.bulkCreate(user).then(() => console.log("User cargado"));

})})
