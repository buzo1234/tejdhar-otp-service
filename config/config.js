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
/* app.use(cors()); */
app.use(cors());
app.use(express.json());
app.options('*', cors());
// Application Routing
app.use('/', require('../routes/router'));

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, PUT, OPTIONS, DELETE, GET'
  );
  res.header('Access-Control-Allow-Origin', [
    'http://localhost:3000',
    'https://tejdharart.com/',
    'https//tejdharart.com',
  ]);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Database configurations
const db = mongoose;
module.exports = {
  app,
  db,
  PORT,
};
