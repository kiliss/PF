const express = require('express');
const router = express.Router();
const { User, Feedback } = require('../db.js');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth.js");
const { sendWelcome } = require("../auth/mailer.js")

const getDbUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'user', 'password', 'email', 'photo', 'admin'],
        include: {
            model: Feedback,
            attributes: ['valoration', 'comment'],
        }
    })
}

router.get("/", async (req, res) => {
    res.json(await getDbUsers())
})

router.get("/user", auth, async (req, res) => {
    const id = req.userId;
    try {
        const users = await User.findByPk(id, {
            include: {
                model: Feedback,
            }
        })
        if (users === null) {
            res.status(404).send("No se encontro usuario con ese ID")
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({ error: "ID_ERROR", description: "Error found ID" })
    }
})

router.post('/', async (req, res) => {
    const { user, password, email, photo, admin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usser = await User.create({
            user: user,
            password: hashedPassword,
            email: email,
            photo: photo,
            admin: admin
        })
        if (usser) {
            sendWelcome(email);
            res.status(200).json("El usuario ha sido creado correctamente");
        }
        else res.status(403).json("El usuario no se ha creado");
    } catch (error) {
        res.status(403).json(error)
    }
});

module.exports = router;