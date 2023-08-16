const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const app = express();
const { config } = require('dotenv');
const pg = require('pg');

config();

// const db = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// app.get('/', (req, res) => {
//   res.send('jelou world');
// });
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/usuarios', usuariosRoutes);

// app.get('/ping', async (req, res) => {
//   const response = await db.query('SELECT NOW()');
//   return res.json(response.rows[0]);
// });

module.exports = app;