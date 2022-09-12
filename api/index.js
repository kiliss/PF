const express = require('express');
const morgan = require('morgan');
const foods = require('./routes/foods');

const server = express();


server.use(morgan('dev'));
server.use(express.json());

server.use('/foods', foods);


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = server;