const express = require('express');
const router = express.Router();
const {Food, Menu} = require('../db.js');

const getDBInfoo = async () => {
    return await Menu.findAll({
        include: {
            model: Food,
            attributes: ['name', "photo", "summary", "price", "stock"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
};


router.get('/', async (req, res) => {
    res.json(await getDBInfoo());
});

router.post('/createfood', async (req, res, next) => {          // crear comida
    const { name, photo, summary, price, stock, menu } = req.body;
        let food = await Food.create({
            name,
            photo,
            summary,
            price,
            stock
        });
        let meenu = await Menu.findOne({
            where: {
                name: menu
            }
        });
        meenu.addFood(food);
        info = await getDBInfoo();
        res.status(201).send("Food created");
});

router.post('/createmenu', async (req, res, next) => {   // Crea menu
    const { name } = req.body;
    Menu.create({
        name: name,
    });
    info = await getDBInfoo();
    res.status(201).send("Menu created");
});
 
router.post('/addfood', async (req, res, next) => {  // Agrega comidas existentes a menus existentes
    const { food, menu } = req.body;
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
});


module.exports = router;