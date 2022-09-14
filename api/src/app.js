require('dotenv').config();
const express = require('express');

require('dotenv').config();
const morgan = require('morgan');
const foods = require('./routes/foods');
const menus = require('./routes/menus');
const users = require('./routes/users');

const server = express();
const cors = require('cors');
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use('/foods', foods);
server.use('/menus', menus);
server.use('/users', users);


module.exports = server;




