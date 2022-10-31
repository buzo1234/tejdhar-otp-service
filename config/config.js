const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { SERVER_PORT } = require('../constants/constants');

// Application configurations
const PORT = SERVER_PORT;
/* app.use(cors()); */
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://www.tejdharart.com',
      'https://tejdharart.com',
    ],
  })
);
app.use(express.json());

// Application Routing
app.use('/', require('../routes/router'));

// Database configurations
const db = mongoose;

module.exports = {
  app,
  db,
  PORT,
};
