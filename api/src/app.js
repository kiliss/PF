const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const foods = require("./routes/foods");
const menus = require("./routes/menus");
const passport = require("passport");
require("./auth/passport.js");
const session = require("express-session");
const http = require("http");

const { Message } = require("./db.js");

// const cookieSession = require('cookie-session');

const login = require("./routes/login");
const users = require("./routes/users");
const reservation = require("./routes/reservation");
// const auth = require("./routes/auth");
const feedbacks = require("./routes/feedbacks");
const table = require("./routes/table");

const pruebapay = require("./routes/pruebapay");

const cors = require("cors");
const server = express();
const sserver = http.createServer(server);
const io = require("socket.io")(sserver, {
  cors: {
    origin: process.env.HOST,
  },
});
//const { isUser } = require("./middleware/auth.js");

// server.use(cors({

// }));

// server.use(cookieSession({
//     name: "user",
//     keys:["pgrestaurant"],
//     maxAge: 24*60*60*1000
// }));

// server.cookieParser()
// {
//     origin:'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
// }
server.use(cors());
// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(morgan("dev"));
server.use(express.json());

server.use(
  session({
    secret: "secret",
  })
);

server.post('/message', async (req, res) => {
  const { message, userId = 0, room = 0 } = req.body;
  try {
      const newMessage = await Message.create({
          message,
          userId,
          room,
          date: new Date().toString()
      })

      io.emit(`room${room}`, message, userId, room);
      io.emit('rooms');

      res.status(200).json(newMessage);
  } catch (error) {
      res.status(409).json({ message: error });
  }

});

io.on("connection", (socket) => {

});

server.use(passport.initialize());
server.use(passport.session());

server.use("/table", table);
server.use("/foods", foods);
server.use("/menus", menus);
// server.use("/auth", auth);
server.use("/users", users);
server.use("/reservation", reservation);
server.use("/login", login);
server.use("/feedbacks", feedbacks);
server.use("/pay", pruebapay);

module.exports = { server, sserver };
