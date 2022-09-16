const express = require('express');
const router = express.Router();
const { Food, Menu } = require('../db.js');

const allFoods = async () => {
    const foods = await Food.findAll();

    const newFood = await foods.map((e) => {
        return {
            id: e.id,
            name: e.name,
            photo: e.photo,
            summary: e.summary,
            price: e.price,
            stock: e.stock,
            drinkable: e.drinkable,
        }
    })
    return newFood;
}

router.get('/', async (req, res) => {
    try {
        if (req.query.filter && req.query.order && req.query.name) {
            let foods = await Food.findAll({
                where: {
                    drinkable: req.query.filter,
                },
                order: [['price', req.query.order]],
                include: {
                    model: Menu,
                    where: {
                        name: req.query.name
                    },
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);
        } else if (req.query.filter && req.query.order) {
            let foods = await Food.findAll({
                where: {
                    drinkable: req.query.filter,
                },
                order: [['price', req.query.order]],
                include: {
                    model: Menu,
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);
        } else if (req.query.filter && req.query.name) {
            let foods = await Food.findAll({
                where: {
                    drinkable: req.query.filter,
                },
                include: {
                    model: Menu,
                    where: {
                        name: req.query.name
                    },
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);
        } else if (req.query.order && req.query.name) {
            let foods = await Food.findAll({
                order: [['price', req.query.order]],
                include: {
                    model: Menu,
                    where: {
                        name: req.query.name
                    },
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);
        } else if (req.query.filter) {
            let foods = await Food.findAll({
                where: {
                    drinkable: req.query.filter,
                },
                include: {
                    model: Menu,
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);

        } else if (req.query.order) {
            let foods = await Food.findAll({
                order: [['price', req.query.order]],
                include: {
                    model: Menu,
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);
        } else if (req.query.name) {
            let foods = await Food.findAll({
                include: {
                    model: Menu,
                    where: {
                        name: req.query.name
                    },
                    attributes: ['name', "photo", "description"]
                }
            })
            res.json(foods);

        } else {
            let foods = await Food.findAll({
                include: {
                    model: Menu,
                },
            });
            res.json(foods);
        }
    }
    catch (error) {
        return res.status(400).json("error " + error.message)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let food = await Food.findByPk(id);
        return res.status(201).send(food);
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
})

router.post('/', async (req, res) => {          // crear comida
    const { name, photo, summary, price, stock, menu, drinkable } = req.body;
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
            drinkable: false || drinkable,
        });
        let meenu = await Menu.findOne({
            where: {
                name: menu
            }
        });
        meenu.addFood(food);
        res.status(201).send("Food created");
    } catch (error) {
        return res.status(400).json("error " + error.message)
    }
});



router.post('/tomenu', async (req, res) => {  // Agrega comidas existentes a menus existentes
    const { food, menu } = req.body;
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

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params;
        const foodToDelete = await Food.findByPk(id)
        if (foodToDelete !== null) {
            await foodToDelete.destroy();
            res.json("food borrada")
        }
    } catch (e) {
        return res.status(404).json("error " + e.message)
    }
})



module.exports = router;