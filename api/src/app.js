require('dotenv').config();
const express = require('express');

require('dotenv').config();
const morgan = require('morgan');
const foods = require('./routes/foods');

const server = express();
const cors = require('cors');
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use('/foods', foods);


module.exports = server;




