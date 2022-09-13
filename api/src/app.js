const express = require('express');
const morgan = require('morgan');
const foods = require('./routes/foods');

const server = express();


server.use(morgan('dev'));
server.use(express.json());

server.use('/foods', foods);

module.exports = server;