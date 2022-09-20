const express = require('express');
const { Op } = require('sequelize');
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
                model: Menu
            }],
            order: [
                price.toUpperCase() === "ASC" || price.toUpperCase() === "DESC" ? ['price', price.toUpperCase()] : ['id', 'DESC']
            ]
        });
        return res.status(201).send(foods);
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let food = await Food.findByPk(id, {
            include: [{
                model: Menu
            }],
            order: [
                [Menu, 'name', 'ASC']
            ]
        });
        return res.status(201).send(food);
    } catch (err) {
        return res.status(400).json("error " + err.message)
    }
});

router.post('/', async (req, res) => {          // crear comida
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