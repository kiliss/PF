const express = require('express');
const router = express.Router();
const { User, Feedback } = require('../db.js');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth.js");
const { sendEmail } = require("../auth/mailer.js")
const jwt = require('jsonwebtoken');




const getDbUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'user', 'password', 'email', 'photo', 'admin'],
        include: {
            model: Feedback,
            attributes: ['valoration', 'comment'],
        }
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


router.get("/", async (req, res) => {
    res.json(await getDbUsers())
})

router.get("/user", auth, async (req, res) => {
    const id = req.userId;
    console.log('id: ' + id)
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

router.post('/google', async (req, res) => {
    const { user, email, photo, googleId } = req.body;
    let password='';
    // console.log("req-body:" ,user, password, email, photo, googleId)
    try {
        const userEmail = await User.findOne({ where: { email } }).catch((err) => { console.log("Error: ", err) });

        if (userEmail && !userEmail.googleId) {
            await User.update({
                googleId
            },
                {
                    where: {
                        email
                    }
                });
            }else{
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
            const jwtToken = jwt.sign(JSON.stringify({ id: usser.id, email: usser.email, googleId: usser.googleId, photo: usser.photo }), process.env.JWT_SECRET);
            // sendWelcome(usser.email);
            sendEmail(
                usser.email,
                '¡Gracias por registrarte en PFRestaurante!',
            `Ahora que formas parte de la familia, tu experiencia mejorara drásticamente:\n\xA0• Podrás realizar reservas dentro de nuestro establecimiento.\n\xA0• Hacer valoraciones de las comidas y bebidas que tenemos a disposición.\n\xA0\n\xA0Tu contraseña temporal es: ${password}\n\xA0\n\xA0Esperamos que disfrutes tu estadía en nuestro página.`,
            'welcome');
            return res.send(jwtToken);
        } 
    }
            const jwtToken = jwt.sign(JSON.stringify({ id: userEmail.id, email: userEmail.email, googleId: userEmail.googleId, photo: userEmail.photo }), process.env.JWT_SECRET);
            return res.send(jwtToken);
        
    } catch (error) {
        res.status(403).json(error)
    }
});

router.put('/', async (req, res) => {
    const { id, admin } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update({
                admin : admin
            },
                {
                    where: {
                        id : id
                    }
                });
            res.status(200).json("El usuario ha sido actualizado correctamente");
        }
        else res.status(403).json("El usuario no se ha actualizado");
    } catch (error) {
        res.status(403).json(error)
    }
});



module.exports = router;