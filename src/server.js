const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {voluntariosRoutes, pacienteRoutes, grupoRoutes, disponibilidadRoutes, antecedenteDeAcompaniamientoRoutes, antecedentePatologicoRoutes, vacacionesRoutes, login, signin, userRoutes } = require('./routes');
// const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
// const antecedenteDeAcompaniamientoRoute = require('./routes/antecedenteDeAcompaniamientoRoute.js');
const app = express();
const { config } = require('dotenv');
const userExtractor = require('./middleware/userExtractor');
// const pg = require('pg');

config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/voluntarios', voluntariosRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/grupo', grupoRoutes);
app.use('/login', login);
app.use('/signin', signin);
app.use('/disponibilidad', disponibilidadRoutes);
app.use('/acompaniamiento', antecedenteDeAcompaniamientoRoutes);
app.use('/patologias', antecedentePatologicoRoutes);
app.use('/vacaciones', vacacionesRoutes);
app.use('/users', userRoutes);

module.exports = app;