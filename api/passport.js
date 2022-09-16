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


 ////////////////////
 
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = '190740947494-faj72vorofojidc333f5r9tlq77afn4d.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});