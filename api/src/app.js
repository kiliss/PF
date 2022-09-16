const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const foods = require('./routes/foods');
const menus = require('./routes/menus');

const cookieSession = require('cookie-session');
const passportSetup = require("../passport");
const passport = require('passport');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reservation = require('./routes/reservation');
const authRoute = require('./routes/auth');


const server = express();
const cors = require('cors');


server.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  server.use(passport.initialize());
  server.use(passport.session());
  
  server.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
  server.use("/auth", authRoute);

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));
server.use(express.json());




server.use('/foods', foods);
server.use('/menus', menus);
server.use('/auth',auth);
server.use('/users', users);
server.use('/reservation', reservation);


module.exports = server;




