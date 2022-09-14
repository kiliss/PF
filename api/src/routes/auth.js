const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../../passport.js');


router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success:true, 
            message:'successfull',
            user:req.user,
            //cookies:req.cookies
        });
    }
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('http://localhost:3001');
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({success:false, message:'failure'});
});

router.get('/google', passport.authenticate('google', { scope: ["profile"] }));

router.get('/google/callback',passport.authenticate('google',{
    successRedirect: 'http://localhost:3001/',
    failureRedirect: '/login/failed'
}));


module.exports = router;