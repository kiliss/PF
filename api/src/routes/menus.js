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

router.post('/', async (req, res, next) => {   // Crea menu
    const { name, photo, description } = req.body;
    Menu.create({
        name: name,
        photo: photo,
        description: description,
    });
    info = await getDBInfoo();
    res.status(201).send("Menu created");
});

router.delete('/:name', async (req, res) => {
    try{
        const name = req.params;
        const menuToDelete = Menu.findAll({
            where: {
                name:{
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        if(menuToDelete !== null){
            await menuToDelete.destroy();
            res.json("Menu Borrado");
        }
    } catch(e) {
        return res.status(404).json("Error" + e)
    }
})

module.exports = router;