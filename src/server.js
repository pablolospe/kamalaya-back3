const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {voluntariosRoutes, pacienteRoutes, disponibilidadRoutes, antecedenteDeAcompaniamientoRoutes, antecedentePatologicoRoutes, login, signin } = require('./routes');
// const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
// const antecedenteDeAcompaniamientoRoute = require('./routes/antecedenteDeAcompaniamientoRoute.js');
const app = express();
const { config } = require('dotenv');
// const pg = require('pg');

config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/voluntarios', voluntariosRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/login', login);
app.use('/signin', signin);
app.use('/disponibilidad', disponibilidadRoutes);
app.use('/acompaniamiento', antecedenteDeAcompaniamientoRoutes);
app.use('/patologias', antecedentePatologicoRoutes);

module.exports = app;