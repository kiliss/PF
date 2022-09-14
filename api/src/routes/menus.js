const express = require('express');
const { Model, Op } = require('sequelize');
const router = express.Router();
const { Menu, Food } = require("../db.js");


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

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    if(name){
        try{
            let findName=await Menu.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%`
                    }
                },
                include:Food
            })
            res.status(201).send(findName);
    }catch(error){
        next(error)
    }
    
}})

router.post('/createmenu', async (req, res, next) => {   // Crea menu
    const { name } = req.body;
    Menu.create({
        name: name,
    });
    info = await getDBInfoo();
    res.status(201).send("Menu created");
});

module.exports = router;