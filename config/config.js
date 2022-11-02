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
/* var corsOptions = {
  origin: '*',
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
}; */
/* app.use(cors()); */
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.options('*', cors());
// Application Routing
app.use('/', require('../routes/router'));

// Database configurations
const db = mongoose;
module.exports = {
  app,
  db,
  PORT,
};
