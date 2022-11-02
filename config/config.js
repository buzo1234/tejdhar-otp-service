const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { SERVER_PORT } = require('../constants/constants');

// Application configurations
/* {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://www.tejdharart.com',
      'https://tejdharart.com',
    ],
    credentials: true,
  } */
const PORT = SERVER_PORT;
var corsOptions = {
  origin: '*',
  credentials: false, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
/* app.use(cors()); */
app.use(cors(corsOptions));
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
