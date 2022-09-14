const express = require('express');
const { Model, Op } = require('sequelize');
const router = express.Router();
const { Menu, Food } = require("../db.js");



const getDBInfoo = async () => {
    return await Menu.findAll({
        include: {
            model: Food,
            attributes: ['name', "photo", "summary", "price", "stock","drinkable"],
            through: {
                attributes: [],
            },
        }
    })
};

router.get('/', async (req, res) => {
    if(req.query.name && req.query.filter){
        try{
            let filterfoodmenu = await Menu.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${req.query.name}%`
                    }
                },
                include: {
                    model: Food,
                    where: {
                        drinkable: req.query.filter,
                    },
                    
                    attributes: ['name', "photo", "summary", "price", "stock","drinkable"], 
                    through: {
                        attributes: [],
                    },
                }
            })
            res.status(201).send(filterfoodmenu);

        }
        catch(error){
            return res.status(400).json("error "+error.message)
        }

    } else if(req.query.name){
        try{
            let findName=await Menu.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${req.query.name}%`
                    }
                },
                include:Food
            })
            res.status(201).send(findName);
            
    }catch(error){
        return res.status(400).json("error "+error.message)
    }

    } else if(req.query.filter){
        try{
            let filterfoodmenu = await Menu.findAll({
                include: {
                    model: Food,
                    where: {
                        drinkable: req.query.filter,
                    },
                    attributes: ['name', "photo", "summary", "price", "stock","drinkable"],
                    through: {
                        attributes: [],
                    },
                }
            })
            res.status(201).send(filterfoodmenu);

        }
        catch(error){
            return res.status(400).json("error "+error.message)
        }

    } else{
        try{
            let allMenus=await Menu.findAll({
                include:Food
            })
            res.status(201).send(allMenus);
        }catch(error){
            return res.status(400).json("error "+error.message)
        }
    }
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
        return res.status(400).json("error "+error.message)
    }
    
}})


router.post('/', async (req, res) => {   // Crea menu
    const { name, photo, description } = req.body;
    try{
    Menu.create({
        name: name,
        photo: photo,
        description: description,
    });
    info = await getDBInfoo();
    res.status(201).send("Menu created");
    } catch (error) {
        return res.status(400).json("error "+error.message)
    }

});

router.delete('/:name', async (req, res) => {
    try{
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
    catch(error){
        return res.status(400).json("error "+error.message)
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
        return res.status(400).json("error "+error.message)
    }
})

module.exports = router;