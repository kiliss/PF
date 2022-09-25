// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');

// const GOOGLE_CLIENT_ID = '190740947494-faj72vorofojidc333f5r9tlq77afn4d.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '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'

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     done(null,profile)
//   }
// ));

// passport.serializeUser((user,done)=>{
//    done(null,user)
// });

// passport.deserializeUser((user,done)=>{
//     done(null,user)
//  });

// jswt passport config
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { where } = require("sequelize");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { User } = require("../db.js");
// const facebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

var config = {
  // facebook: {
  //   id: process.env.ID,
  //   secret: process.env.SECRET,
  // },
  // google: {
  //   id: process.env.ID_GOOGLE,
  //   secret: process.env.GOOGLE_SECRET,
  // },
};

// module.exports = function (passport) {
//   // passport.serializeUser(function (user, done) {
//   //   done(null, user);
//   // });
//   // passport.deserializeUser(function (user, done) {
//   //   done(null, user);
//   // });

//   //   passport.use(new facebookStrategy({
//   //     clientID: config.facebook.id,
//   //     clientSecret: config.facebook.secret,
//   //     callbackURL: '/auth/facebook/callback',
//   //     profileFields: ['id', 'displayName', /*'provider',*/ 'photos', 'emails']
//   //   }, function(accessToken, refreshToken, profile, done) {

//   //     User.findOne({id: profile.id}, function(err, user) {
//   // 			if(err) throw(err);
//   // 			if(!err && user!= null) return done(null, user);

//   // 			// Al igual que antes, si el usuario ya existe lo devuelve
//   // 			// y si no, lo crea y salva en la base de datos
//   // 			var user = new User({
//   // 				id: profile.id,
//   // 				email: profile.email[0].value,
//   // 				name: profile.displayName,
//   // 				photo: profile.photos[0].value
//   // 			});
//   // 			user.Create(function(err) {
//   // 				if(err) throw err;
//   // 				done(null, user);
//   // 			});
//   // 		});
//   // 	}));
//   // passport.use(
//   //   new GoogleStrategy(
//   //     {
//   //       clientID: config.google.id,
//   //       clientSecret: config.google.secret,
//   //       callbackURL: "/auth/google/callback",
//   //     },
//   //     function (accessToken, refreshToken, profile, done) {
//   //       // console.log(profile);
//   //       return done(null, profile);          
//   //     })
//   // )
//   };
  

