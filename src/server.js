const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { config } = require('dotenv');
const pg = require('pg');

config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.get('/', (req, res) => {
  res.send('jelou world');
});

app.get('/ping', async (req, res) => {
  const response = await db.query('SELECT NOW()');
  return res.json(response.rows[0]);
});

module.exports = app;