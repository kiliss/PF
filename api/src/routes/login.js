const express = require('express');
const router = express.Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { password, email } = req.body;
    try {
        const userEmail = await User.findOne({ where: { email } }).catch((err) => { console.log("Error: ", err) });
        if (!userEmail) {
            return res.json({ message: "Email o contraseña incorrecto!" })
        }
        if (userEmail.password !== password) {
            return res.json({ message: "Email o contraseña incorrecto!" })
        }

        const jwtToken = jwt.sign({id: userEmail.id, email: userEmail.email},process.env.JWT_SECRET); 

        res.json({message:"bienvenido!", token: jwtToken});

    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;