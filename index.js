const app = require('./src/server')
const { conn } = require('./src/db/db.js');
const { Voluntario, User, Paciente } = require("./src/db/db");

conn.sync({force:false}).then(() => {
    app.listen(8000, () => {
      console.log(`Server running...`);

      const voluntario = [
        { nombre:"Nico", apellido:"Marra", email: "marra@s.com",telefonoEmergencia: "66666666", nombreContactoEmergencia: "Roberto Enfermero", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
        { nombre: "Pablo", apellido: "Lospennato", email: "yosoypxl@gmail.com", profesion_oficio_ocupacion:"Doctor, especialidad: cardiología", hobbies_habilidades:"electricista", dni: 34567890, genero: "M", fechaDeNacimiento: "1984-11-07", fechaAlta: "2020-06-21", fechaBaja: "2025-06-21", tieneAuto: true, calle: "Sucre", numero: 1234, localidad: "Boulogne", provincia: "Buenos Aires", pais: "Argentina", codigoPostal: "1625", telefono: "1232345", telefono2: "1232345", experienciaCP: true },
        ]

      const paciente = [
        { voluntario_id:1, fechaAlta: "2020-06-21", fechaBaja: null, cuidadorPrincipal: "Rodri Mas", telefonoCuidadorPrincipal: "987654321", insumosPrestados: "Respirador", nombre: "Fernando", apellido: "Tremens", genero: "M", fechaDeNacimiento: "1920-06-21", dni: "87654321", email: "asd@asd.asd", telefono: "98765432", telefono2: "987654321", lat:"-34.4972274", lng:"-58.496132", calle:"Paraná", numero:"1234", localidad:"Martinez", provincia:"Buenos Aires", pais:"Argentina", codigoPostal: "1640", obraSocial: "IOMA", ocupacionProfesionHobbie: "Abogado", situacionEconomica: "maso", situacionHabitacional: "Tiene derpa", quienDeriva: "Doctor Alce", contactoQuienDeriva: "123 123 123 1231", diagnostico:"EPOC", fechaDeDiagnostico:"2022-02-02", enfermedadActual: "Epoc", ECOGbasal: "5", antecedentesEnfermedadesPrevias: "un toco", medicacionActual: "fafafafa", equipoSeguimiento: "", pacienteConoceDiagnostico: "Falta preguntar", pacienteConocePronostico: "Si", familiaConoceDiagnostico: "No", familiaConocePronostico: "Si", problemasActuales: "Tristeza", recursosDisponibles: "Plata", recursosAExplotar: "esa plata", familia: "Buena familia"  }
      ]

      const user = [
        {
          nombre:"Pablo", apellido:"Lospennato", email:"p@x.l", hashPassword:"$2b$08$VsBJhQi9LndBKwrikXtjpu5B8Ywj1d5dnaWLpwr8o1j.mYFeYV9NC", role:"Admin"
        },
        {
          nombre:"Cosme", apellido:"Fulanito", email:"user@gmail.com", hashPassword:"$2b$08$$2b$08$iM1MvpU1xLP30COVHBFYQOMQtV.5MOvtAxQr4qF16Hfi2vN2mzFiO", role:"User"
        },
      ]

      User.bulkCreate(user).then(() => console.log("User cargado"));
      // Voluntario.bulkCreate(voluntario).then(() => console.log("Voluntarios cargados"));
      // Paciente.bulkCreate(paciente).then(() => console.log("Pacientes cargados"));
})})
