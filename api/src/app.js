require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/foods.js');

app.use(cors());

const http = require('http');
const server = http.createServer(app);

app.use('/', routes);

module.exports = server;