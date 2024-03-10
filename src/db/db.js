require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

let sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize({
    database: DB_NAME,
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: false,
  }) : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    native: false,
  });

// const sequelize = new Sequelize(
//   DB_NAME,
//   DB_USER,
//   DB_PASSWORD,
//   {
//    host: DB_HOST,
//    dialect: "mysql",
//    port: DB_PORT,
//   }
//  );
//  sequelize
//  .authenticate()
//  .then(() => {
//   console.log("DATABASE CONNECTED");
//  })
//  .catch((err) => {
//   console.log(err);
//  });

// let sequelize = process.env.NODE_ENV === 'production'
//   ? new Sequelize({
//     database: DB_NAME,
//     dialect: 'mysql',
//     host: DB_HOST,
//     port: DB_PORT,
//     username: DB_USER,
//     password: DB_PASSWORD,
//     pool: {
//       max: 3,
//       min: 1,
//       idle: 10000,
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//       keepAlive: true,
//     },
//     // ssl: true,
    
//   }) : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`, {
//     logging: false,
//     native: false,
//   });

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '../models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { 
  Voluntario, 
  Disponibilidades, 
  HistorialEnKamalaya, 
  AntecedenteDeAcompaniamiento, 
  AntecedentePatologico, 
  Vacaciones, 
  Paciente, 
  Grupo, 
  GrupoVoluntario, 
  Seguimiento, 
  SeguimientoVoluntario, 
  Capacitaciones, 
  CapacitacionVoluntario 
} = sequelize.models;

Voluntario.hasOne(Paciente, { foreignKey: 'voluntario_id' });
Paciente.belongsTo(Voluntario, { foreignKey: 'voluntario_id' });

Voluntario.hasMany(Disponibilidades, { foreignKey: 'voluntario_id' })
Disponibilidades.belongsTo(Voluntario, { foreignKey: 'voluntario_id' })

Voluntario.hasMany(AntecedenteDeAcompaniamiento, { foreignKey: 'voluntario_id' })
AntecedenteDeAcompaniamiento.belongsTo(Voluntario, { foreignKey: 'voluntario_id' })

Voluntario.hasMany(AntecedentePatologico, { foreignKey: 'voluntario_id' })
AntecedentePatologico.belongsTo(Voluntario, { foreignKey: 'voluntario_id' })

Voluntario.hasMany(Vacaciones, { foreignKey: 'voluntario_id' })
Vacaciones.belongsTo(Voluntario, { foreignKey: 'voluntario_id' })

Grupo.belongsToMany(Voluntario, { through: GrupoVoluntario, foreignKey: 'grupo_id', });
Voluntario.belongsToMany(Grupo, { through: GrupoVoluntario, foreignKey: 'voluntario_id', });

Capacitaciones.belongsToMany(Voluntario, { through: CapacitacionVoluntario, foreignKey: 'capacitacion_id', });
Voluntario.belongsToMany(Capacitaciones, { through: CapacitacionVoluntario, foreignKey: 'voluntario_id', });

Grupo.belongsTo(Paciente, { foreignKey: 'paciente_id', });
Paciente.hasMany(Grupo, { foreignKey: 'paciente_id', });

Seguimiento.belongsTo(Paciente, { foreignKey: 'paciente_id', });
Paciente.hasMany(Seguimiento, { foreignKey: 'paciente_id', });

Seguimiento.belongsToMany(Voluntario, { through: SeguimientoVoluntario, foreignKey: 'seguimiento_id', });
Voluntario.belongsToMany(Seguimiento, { through: SeguimientoVoluntario, foreignKey: 'voluntario_id', });

module.exports = {
  ...sequelize.models,
  conn: sequelize, 
  Op
};
