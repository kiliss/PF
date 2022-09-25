const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db.js");

const CLIENT_URL = "http://localhost:3000";

function passwordRandom() {
  return "secret";
}
// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/login/success", (req, user) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "succesfull",
//       user: req.user,
//     });
//   }
// });

// router.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/login");
// });

// // router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

// // router.get('/facebook/callback', passport.authenticate('facebook',

// // { successRedirect: CLIENT_URL, failureRedirect: '/login'}

// // ))

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   async (req, res) => {
//     // Successful authentication, redirect home.
//     console.log(req.user);
//     const { googleId: id, displayName, emails, photos } = req.user;
//     try {
//       var userEmail = await User.findOne({
//         where: { googleId: googleId },
//       }).catch((err) => {
//         console.log("Error: ", err);
//       });
//       // console.log('bd user :',userEmail)
//       if (!userEmail) {
//         userEmail = await User.create({
//           googleId: googleId,
//           user: displayName,
//           email: emails[0].value,
//           photo: photos[0].value,
//           password: bcrypt.hash(passwordRandom(), 10),
//         });
//       }
//       const jwtToken = jwt.sign(
//         JSON.stringify({
//           id: userEmail.id,
//           email: userEmail.email,
//           user: userEmail.user,
//           photo: userEmail.photo,
//         }),
//         process.env.JWT_SECRET
//       );
//       res.redirect(`${CLIENT_URL}`).json(jwtToken);
//     } catch (error) {
//       res.status(404).json(error);
//     }
//   }
// );

// router.get('/google/callback', passport.authenticate('google',

// { successRedirect: CLIENT_URL, failureRedirect: '/login'}

// ))

module.exports = router;
