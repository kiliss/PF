const express = require('express');
const router = express.Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { password, email } = req.body;
    try {
        const userEmail = await User.findOne({ where: { email } }).catch((err) => { console.log("Error: ", err) });
        // console.log('bd user :',userEmail)
        if (!userEmail) {
            return res.json({ message: "!Email o contraseña incorrecto!" })
        }

        const match = await bcrypt.compare(password, userEmail.password);
        //console.log('math: ',match)

        if (match) {
            if (userEmail.erased === true) {
                return res.json({ message: "!Email o contraseña incorrecto!" })
            } else {
                const jwtToken = jwt.sign(JSON.stringify({ id: userEmail.id, email: userEmail.email, admin: userEmail.admin }), process.env.JWT_SECRET);
                return res.json({ session: jwtToken, photo: userEmail.photo, name: userEmail.user });
            }
        } else {
            return res.json({ message: "!Email o contraseña incorrecto!" });
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/validate', async (req, res) => {
    const { password, email } = req.body;
    try {
        const userEmail = await User.findOne({ where: { email } }).catch((err) => { console.log("Error: ", err) });
        // console.log('bd user :',userEmail)
        if (!userEmail) {
            return res.json({ message: "!Email o contraseña incorrecto!" })
        } else
            if (userEmail.erased === true) {
                return res.json({ message: "!Email o contraseña incorrecto!" })
            } else {
                const match = await bcrypt.compare(password, userEmail.password);
                //console.log('math: ',match)
                if (match) {
                    return res.json({ message: "¡Contraseña correcta!" })
                } else {
                    return res.json({ message: "!Email o contraseña incorrecto!" });
                }
            }
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;