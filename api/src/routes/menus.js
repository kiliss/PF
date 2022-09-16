const express = require('express');
const { Model, Op } = require('sequelize');
const router = express.Router();
const { Menu, Food } = require("../db.js");



const getDBInfoo = async () => {
    return await Menu.findAll({
        include: {
            model: Food,
            attributes: ['name', "photo", "summary", "price", "stock", "drinkable"],
            through: {
                attributes: [],
            },
        }
    })
};

router.get('/', async (req, res) => {
    const { name, filter = '', price = '', vegetarian = '' } = req.query;
    try {
        if (name) {
            let menu = await Menu.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: [{
                    model: Food,
                    where: {
                        drinkable: {
                            [Op.or]: filter === 'drink' ? [true] : filter === 'food' ? [false] : [true, false]
                        },
                        vegetarian: {
                            [Op.or]: vegetarian === 'true' ? [true] : vegetarian === 'false' ? [false] : [true, false]
                        }
                    }
                }],
                order: [
                    price.toUpperCase() === "ASC" || price.toUpperCase() === "DESC" ? [Food, 'price', price.toUpperCase()] : [Food, 'id', 'DESC']
                ]
            });
            return res.status(201).send(menu);
        } else {
            return res.status(201).send(await Menu.findAll());
        }
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
})

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    if (name) {
        try {
            let findName = await Menu.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: Food
            })
            res.status(201).send(findName);
        } catch (error) {
            return res.status(400).json("error " + error.message)
        }

    }
})


router.post('/', async (req, res) => {   // Crea menu
    const { id, name, photo, description } = req.body;
    try {
        Menu.create({
            id: id,
            name: name,
            photo: photo,
            description: description,
        });
        info = await getDBInfoo();
        res.status(201).send("Menu created");
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }

});

router.delete('/:name', async (req, res) => {
    try {
        let menu = await Menu.findOne({
            where: {
                name: req.params.name
            }
        });
        if (menu) {
            await menu.destroy();
            res.status(200).send("Menu deleted");
        } else {
            res.status(404).send("Menu not found");
        }
    }
    catch (error) {
        return res.status(400).json("error " + error.message)
    }
})

router.put('/:name', async (req, res) => {
    try {
        let menu = await Menu.findOne({
            where: {
                name: req.params.name
            }
        });
        if (menu) {
            await menu.update();
            res.status(200).send("Menu updated");
        } else {
            res.status(404).send("Menu not found");
        }
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }
})

module.exports = router;