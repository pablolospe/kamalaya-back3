// const express = require('express');
// const app = express()
// require('dotenv').config();
const { Usuario } = require("./src/db/db")
const app = require('./src/server')
const { conn } = require('./src/db/db.js');

// app.listen(8000)
// console.log(`server on port 8000`);

conn.sync({force:true}).then(() => {
    app.listen(8000, () => {
      console.log(`Server running...`);

      const usuario = [
        { nombre:"Nico", apellido:"Marra", email: "marra@s.com", hashPassword: null,telefonoEmergencia: "66666666", nombreContactoEmergencia: "Roberto Enfermero", rol: "Admin", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
        { nombre: "Pablo", apellido: "Lospennato", email: "yosoypxl@gmail.com", hashPassword: "$2b$08$VPQsvuTqfWv/MUBQZOy6n./d16Yucoxi53FkmI09qRRXZXKr7jJEa", rol: "Admin", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
        ]

        Usuario.bulkCreate(usuario).then(() => console.log("Usuarios cargados"));

})})