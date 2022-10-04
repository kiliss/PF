const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Food, Menu, Score, User, Feedback, conn } = require('../db.js');
const { isUser, isAdmin } = require("../middleware/auth.js");

const timeSince = (stringDate) => {
    var date = new Date(stringDate);

    var seconds = Math.floor((new Date() - date) / 1000);

    var years = seconds / 31536000;
    if (years === 1) return `hace ${Math.floor(years)} año`;
    if (years > 1) return `hace ${Math.floor(years)} años`;

    var months = seconds / 2592000;
    if (months === 1) return `hace ${Math.floor(months)} mes`;
    if (months > 1) return `hace ${Math.floor(months)} meses`;

    var days = seconds / 86400;
    if (days === 1) return `hace ${Math.floor(days)} día`;
    if (days > 1) return `hace ${Math.floor(days)} días`;

    var hours = seconds / 3600;
    if (hours === 1) return `hace ${Math.floor(hours)} hora`;
    if (hours > 1) return `hace ${Math.floor(hours)} horas`;

    var minutes = seconds / 60;
    if (minutes === 1) return `hace ${Math.floor(minutes)} minuto`;
    if (minutes > 1) return `hace ${Math.floor(minutes)} minutos`;

    if (seconds === 0) return `justo ahora`;
    if (seconds === 1) return `hace ${Math.floor(seconds)} segundo`;
    return `hace ${Math.floor(seconds)} segundos`;
}


router.get('/all', isAdmin, async (req, res) => {
    try {
        let foods = await Food.findAll({
            include: [{
                model: Menu
            }],
            order: [
                ['id', 'DESC']
            ]
        });
        return res.status(201).send(foods);
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.get('/search', async (req, res) => {
    const { name = '', filter = '', price = '', vegetarian = '' } = req.query;
    try {
        let foods = await Food.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                },
                drinkable: {
                    [Op.or]: filter === 'drink' ? [true] : filter === 'food' ? [false] : [true, false]
                },
                vegetarian: {
                    [Op.or]: vegetarian === 'true' ? [true] : [true, false]
                }
            },
            include: [{
                model: Menu,
                where: {
                    visible: true
                }
            }],
            order: [
                price.toUpperCase() === "ASC" || price.toUpperCase() === "DESC" ? ['price', price.toUpperCase()] : ['id', 'DESC']
            ]
        });
        return res.status(201).send(foods.filter(f => f.menus.length));
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food.findByPk(id,
            {
                include: [
                    {
                        model: Menu,
                        attributes: ['name']
                    },
                    {
                        model: Score,
                        attributes: ['stars']
                    },
                    {
                        model: Feedback,
                        include: {
                            model: User,
                            attribute: ['user', 'photo']
                        }
                    }
                ],
                order: [
                    [Menu, 'name', 'ASC'],
                    [Feedback, 'id', 'DESC']
                ],
            });
        if (food) return res.status(201).send({
            id: food.id,
            name: food.name,
            photo: food.photo,
            summary: food.summary,
            price: food.price,
            drinkable: food.drinkable,
            vegetarian: food.vegetarian,
            menus: food.menus.map(menu => menu.name),
            stars: food.scores.length ? food.scores.reduce((prev, curr) => prev + curr.stars, 0) / food.scores.length : 0,
            comments: food.feedbacks.length ? food.feedbacks.map(f => { return { id: f.id, name: f.user.user, photo: f.user.photo, comment: f.comment, time: timeSince(f.time) } }) : []
        });
        else return res.status(201).send(food);
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.post('/all', isAdmin, async (req, res) => {          // crear comida
    const { name, photo, summary, price, stock, menu, drinkable, vegetarian } = req.body;
    console.log(req.body)
    try {
        findname = await Food.findOne({
            where: {
                name: name
            }
        });
        if (findname) {
            return res.status(400).send("Food already exists");
        }
        let food = await Food.create({
            name,
            photo,
            summary,
            price,
            stock,
            vegetarian,
            drinkable: false || drinkable,
        });
        menu?.map(async (m) => {
            let meenu = await Menu.findOne({
                where: {
                    name: m
                }
            });
            food.addMenu(meenu);
        })
        res.status(201).send("Food created");
    } catch (error) {

        return res.status(400).json("error " + error.message)
    }
});



router.post('/tomenu', isAdmin, async (req, res) => {  // Agrega comidas existentes a menus existentes
    const { food, menu } = req.body;
    console.log(req.body)
    try {
        let meenu = await Menu.findOne({
            where: {
                name: menu
            }
        });
        let foood = await Food.findOne({
            where: {
                name: food
            }
        });
        meenu.addFood(foood);
        res.status(201).send("Food added");
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }
});
router.put("/:id", isAdmin, async (req, res) => {  // modificar comida
    const { id } = req.params;
    const { name, photo, summary, price, stock, drinkable, vegetarian } = req.body;
    try {
        await Food.update({
            name,
            summary,
            price,
            photo
        }, {
            where: {
                id: id
            }
        });
        res.json("food modificada")
    } catch (e) {
        return res.status(404).json("error " + e.message)
    }
});

router.delete("/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Food.destroy({
            where: {
                id: id
            }
        });
        res.json("food borrada");
    } catch (e) {
        return res.status(404).json("error " + e.message);
    }
})

router.post('/score/:id', isUser, async (req, res) => {          // dar score
    const { id: foodId = 0 } = req.params;
    const { user: userId = 0, valoration: stars = 0 } = req.query;

    try {
        const feedback = await Score.findOne({
            where: {
                userId,
                foodId
            }
        });
        if (feedback) {
            await Score.update(
                {
                    stars
                },
                {
                    where: {
                        userId,
                        foodId
                    }
                });
            return res.status(201).send("La puntuación fue cambiada");
        }
        await Score.create({
            userId,
            foodId,
            stars
        });
        res.status(201).send("La puntuación fue registrada");
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.post('/comment/:id', isUser, async (req, res) => {          // crear feedback
    const { id: foodId = 0 } = req.params;
    const { user: userId = 0 } = req.query;
    const { comment } = req.body;

    try {
        await Feedback.create({
            userId,
            foodId,
            comment,
            time: new Date().toString()
        });
        res.status(201).send("La comentario fue agregado");
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});


module.exports = router;