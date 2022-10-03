const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Menu, Food } = require("../db.js");
const { isAdmin } = require("../middleware/auth.js");


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

router.get('/all', isAdmin, async (req, res) => {
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
                            [Op.or]: vegetarian === 'true' ? [true] : [true, false]
                        }
                    }
                }],
                order: [
                    price.toUpperCase() === "ASC" || price.toUpperCase() === "DESC" ? [Food, 'price', price.toUpperCase()] : [Food, 'id', 'DESC']
                ]
            });
            return res.status(201).send(menu);
        } else {
            return res.status(201).send(await Menu.findAll({
                include: {
                    model: Food,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            }));
        }
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.get('/visible', async (req, res) => {
    const { name, filter = '', price = '', vegetarian = '' } = req.query;
    try {
        if (name) {
            let menu = await Menu.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    },
                    visible: true
                },
                include: [{
                    model: Food,
                    where: {
                        drinkable: {
                            [Op.or]: filter === 'drink' ? [true] : filter === 'food' ? [false] : [true, false]
                        },
                        vegetarian: {
                            [Op.or]: vegetarian === 'true' ? [true] : [true, false]
                        }
                    }
                }],
                order: [
                    price.toUpperCase() === "ASC" || price.toUpperCase() === "DESC" ? [Food, 'price', price.toUpperCase()] : [Food, 'id', 'DESC']
                ]
            });
            return res.status(201).send(menu);
        } else {
            return res.status(201).send(await Menu.findAll({
                where: {
                    visible: true
                },
                include: {
                    model: Food,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            }));
        }
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

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
});

router.get('/exist/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const menu = await Menu.findOne({where: {
            name: {
                [Op.iLike]: `%${name}%`
            },
            visible: true
        }});
        if (!menu) {
            res.status(200).json({message:"No existe"});
        } else {
            res.status(200).json({message:"Existe"});
        }
    } catch (err) {
        console.log(err)
    }
});

router.post('/', isAdmin, async (req, res) => {   // Crea menu
    const { name, photo, description } = req.body;
    try {
        Menu.create({
            name: name,
            photo: photo,
            description: description,
            visible: false,
            homeVisible: false
        });
        info = await getDBInfoo();
        res.status(201).send("Menu created");
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }

});

router.delete('/:name', isAdmin, async (req, res) => {
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
//delete food menu
router.delete('/:name/:food', isAdmin, async (req, res) => {
    try {
        let menu = await Menu.findOne({
            where: {
                name: req.params.name
            }
        });
        let food = await Food.findOne({
            where: {
                name: req.params.food
            }
        });
        if (menu && food) {
            await menu.removeFood(food);
            res.status(200).send("Food deleted");
        } else {
            res.status(404).send("Menu or food not found");
        }
    }
    catch (error) {
        return res.status(400).json("error " + error.message)
    }
})

router.put('/:name', isAdmin, async (req, res) => {
    const { name, photo, description, visible, homeVisible } = req.body;
    try {
        let menu = await Menu.findOne({
            where: {
                name: req.params.name
            }
        });
        if (menu) {
            await menu.update({
                name: name,
                photo: photo,
                description: description,
                visible: visible,
                homeVisible: homeVisible
            });
            res.status(200).send("Menu updated");
        } else {
            res.status(404).send("Menu not found");
        }
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }
})

module.exports = router;