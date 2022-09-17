const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const foods = require('./routes/foods');
const menus = require('./routes/menus');
require('./auth/passport');

// const cookieSession = require('cookie-session');
// const passport = require('passport');
const login = require('./routes/login');
const users = require('./routes/users');
const reservation = require('./routes/reservation');
const authRoute = require('./routes/auth');
const feedbacks = require('./routes/feedbacks');



const server = express();
const cors = require('cors');


// server.use(cookieSession({
//     name: "session",
//     keys:["pgrestaurant"],
//     maxAge: 24*60*60*1000
// }));
// server.use(passport.initialize());
// server.use(passport.session({}));

// server.use(cors({
//     origin:'*',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
// }));
server.use(cors())

// server.use(
//     cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
//   );
  
//   server.use(passport.initialize());
//   server.use(passport.session());
  
//   server.use(
//     cors({
//       origin: "*",
//       methods: "GET,POST,PUT,DELETE",
//       credentials: true,
//     })
//   );
  
//   server.use("/auth", authRoute);

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));
server.use(express.json());




server.use('/foods', foods);
server.use('/menus', menus);
// server.use('/auth',auth);
server.use('/users', users);
server.use('/reservation', reservation);
server.use('/login', login);
server.use('/feedbacks',feedbacks);

module.exports = server;




