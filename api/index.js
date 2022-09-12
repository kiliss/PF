const express = require('express');
const morgan = require('morgan');
const food = require('./src/routes/food');


const server = express();

server.use(express.json())
server.use(morgan('dev'));

server.use("/food" , food);

server.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});