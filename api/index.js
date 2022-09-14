const express = require('express');
const morgan = require('morgan');
const foods = require('./routes/foods');
const cookieSession = require('cookie-session');
const passport = require('passport');
const auth = require('./routes/auth');
const cors = require('cors');

const server = express();

//middleware login
server.use(cookieSession({
    name: "session",
    keys:["pgrestaurant"],
    maxAge: 24*60*60*1000
}));
server.use(passport.initialize());
server.use(passport.session({}));

server.use(cors({
    origin:'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));


server.use(morgan('dev'));
server.use(express.json());

server.use('/foods', foods);
server.use('/auth',auth);


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = server;