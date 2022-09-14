require('dotenv').config();
const express = require('express');

require('dotenv').config();
const morgan = require('morgan');
const foods = require('./routes/foods');
const menus = require('./routes/menus');

const server = express();
const cors = require('cors');
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use('/foods', foods);
server.use('/menus', menus);


module.exports = server;




