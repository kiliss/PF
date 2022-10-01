const express = require('express');
const router = express.Router();
const { User, Feedback, Reservation, Table } = require('../db.js');
const bcrypt = require('bcrypt');
const { checkAuth, isUser, isAdmin } = require("../middleware/auth.js");
const { sendEmail } = require("../auth/mailer.js")
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

const getDbUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'user', 'password', 'email', 'photo', 'admin', "ban"],
        include: [
            {
                model: Reservation,
                attributes: ['date', 'hour', 'price'],
                include:
                {
                    model: Table
                }
            }
        ]
    })
}
const generateP = () => {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}


router.get("/", isAdmin, async (req, res) => {
    res.json(await getDbUsers())
})

router.get("/user", checkAuth, async (req, res) => {
    const id = req.userId;
    // console.log('id: ' + id)
    try {
        const users = await User.findByPk(id, {
            include: [
                {
                    model: Reservation,
                    include:
                    {
                        model: Table
                    }
                }
            ]
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
            sendEmail(
                email,
                '¡Gracias por registrarte en PFRestaurante!',
                `Ahora que formas parte de la familia, tu experiencia mejorara drásticamente:\n\xA0• Podrás realizar reservas dentro de nuestro establecimiento.\n\xA0• Hacer valoraciones de las comidas y bebidas que tenemos a disposición.\n\xA0\n\xA0\n\xA0Esperamos que disfrutes tu estadía en nuestro página.`,
                'welcome');
            res.status(200).json("El usuario ha sido creado correctamente");
        }
        else res.status(403).json("El usuario no se ha creado");
    } catch (error) {
        res.status(403).json(error)
    }
});

router.post('/google', async (req, res) => {
    const { user, email, photo, googleId } = req.body;
    let password = '';
    // console.log("req-body:" ,user, password, email, photo, googleId)
    try {
        const userEmail = await User.findOne({ where: { email } }).catch((err) => { console.log("Error: ", err) });
        if (userEmail && !userEmail.googleId && userEmail.ban === false) {
            await User.update({
                googleId
            },
                {
                    where: {
                        email
                    }
                });
        } else {
            if (!userEmail) {
                password = generateP();
                // console.log(password)
                const hashedPassword = await bcrypt.hash(password, 10);
                const usser = await User.create({
                    user: user,
                    password: hashedPassword,
                    email: email,
                    photo: photo,
                    googleId: googleId,
                })
                const jwtToken = jwt.sign(JSON.stringify({ id: usser.id, email: usser.email, googleId: usser.googleId, admin: usser.admin }), process.env.JWT_SECRET);
                sendEmail(
                    usser.email,
                    '¡Gracias por registrarte en PFRestaurante!',
                    `Ahora que formas parte de la familia, tu experiencia mejorara drásticamente:\n\xA0• Podrás realizar reservas dentro de nuestro establecimiento.\n\xA0• Hacer valoraciones de las comidas y bebidas que tenemos a disposición.\n\xA0\n\xA0Tu contraseña temporal es: ${password}\n\xA0\n\xA0Esperamos que disfrutes tu estadía en nuestro página.`,
                    'welcome');
                return res.send({ session: jwtToken, photo: usser.photo, name: usser.user });
            }
        }
        const jwtToken = jwt.sign(JSON.stringify({ id: userEmail.id, email: userEmail.email, googleId: userEmail.googleId, admin: userEmail.admin }), process.env.JWT_SECRET);
        return res.send({ session: jwtToken, photo: userEmail.photo, name: userEmail.user });


    } catch (error) {
        res.status(403).json(error)
    }
});

router.put('/', isAdmin, async (req, res) => {
    const { id, admin, ban } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update({
                admin: admin,
                ban: ban
            },
                {
                    where: {
                        id: id
                    }
                });
            res.status(200).json("El usuario ha sido actualizado correctamente");
        }
        else res.status(403).json("El usuario no se ha actualizado");
    } catch (error) {
        res.status(403).json(error)
    }
});

router.put('/disableacc', checkAuth, async (req, res) => {
    const id = req.userId;
    const {ban} = req.body;
    try {
        await User.update({
            ban
        },
        {
            where: {
                id
            }
        })
        res.status(200).json("Usuario baneado")
    } catch (error) {
        res.status(403).json(error)
    }
})

router.put('/name', isUser, async (req, res) => {
    const { id, name } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                { user: name },
                { where: { id: id } }
            )
            res.status(200).json("Su nombre de usuario ha sido actualizad correctamente")
        }
        else res.status(403).json("Error al actualizar la contraseña")
    } catch (error) {
        res.status(403).json(error)
    }

})


router.put('/passwd', isUser, async (req, res) => {
    const { id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                { password: hashedPassword },
                { where: { id: id } }
            )
            res.status(200).json("La contraseña ha sido actualizada correctamente")
        }
        else res.status(403).json("Error al actualizar la contraseña")
    } catch (error) {
        res.status(403).json(error)
    }

})


router.put('/photo', isUser, async (req, res) => {
    const { id, photo } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                { photo: photo },
                { where: { id: id } }
            )
            res.status(200).json("La imagen de perfil se ha sido actualizado correctamente")
        }
        else res.status(403).json("Error al actualizar imagen de perfil")
    } catch (error) {
        res.status(403).json(error)
    }

})

router.get('/findemail', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({where: {
            email: email
        }});
        if (!user || user.ban === true) {
            res.status(200).json({message:"No existe"})
        } else if (user) {
            res.status(200).json({message:"Existe"})
        }
    } catch (error) {
        console.log(error)
    }
})


//recuperar contraseña
router.post("/forgotPassword", async (req, res) => {
    const { email } = req.body;
    // console.log(email)
    try {
        const oldUser = await User.findOne({ where: { email } });
        if (!oldUser && oldUser.ban === true) {
            return res.json({ message: "Usuario no existe!!" });
        }
        const jwtToken = jwt.sign(JSON.stringify({ id: oldUser.id, email: oldUser.email, admin: oldUser.admin }), process.env.JWT_SECRET);
        // console.log(jwtToken)
        const link = `http://localhost:3000/resetPassword/${oldUser.id}/${jwtToken}`;
        //enviar correo ...
        // console.log(link)
        sendEmail(
            oldUser.email,
            '¡Proceso de recuperación de contraseña!',
            `Ingresa al siguiente link para modificar tu contraseña: \n\xA0 ${link}`,
            'Forgot password');
        return res.send( {message: 'Correo enviado!'} );
    } catch (error) {
        res.status(403).json(error)
    }
});


router.post("/resetPassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log('id: ',id, ' pass: ',password,' token: ', token)   
    const oldUser = await User.findOne({ where: { id: id } });
    if (!oldUser) {
        return res.json({ message: "Usuario no existe!" });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.id === oldUser.id){
            const encryptedPassword = await bcrypt.hash(password, 10);
            await User.update(
                { password: encryptedPassword },
                { where: { id: id } }
            )
            sendEmail(
                oldUser.email,
                '¡Contraseña Actualizada!',
                `Hola ${oldUser.user}, recientemente se cambio tu contraseña, tu nueva contraseña es: ${password}`,
                'Reset password');
            return res.json({ email: verify.email, message: "Contraseña Actualizada!" })
        }
        return res.json({message: 'Algo salió mal!'})
        
    } catch (error) {
        console.log(error);
        res.json({ Error: "Algo salió mal" });
    }
});


module.exports = router;