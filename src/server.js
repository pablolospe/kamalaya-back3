const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {voluntariosRoutes, disponibilidadRoutes, antecedenteDeAcompaniamientoRoute, login, signin } = require('./routes');
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
app.use('/login', login);
app.use('/signin', signin);
app.use('/disponibilidad', disponibilidadRoutes);
app.use('/acompaniamiento', antecedenteDeAcompaniamientoRoute);

module.exports = app;