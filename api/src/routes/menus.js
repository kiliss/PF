const express = require('express');
const { Model, Op } = require('sequelize');
const router = express.Router();
const { Menu, Food } = require("../db.js");


const getDBInfoo = async () => {
    return await Menu.findAll({
        include: {
            model: Food,
            attributes: ['name', "photo", "summary", "price", "stock","bebible"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
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
                        bebible: req.query.filter,
                    },
                    
                    attributes: ['name', "photo", "summary", "price", "stock","bebible"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
                    through: {
                        attributes: [],//traer mediante los atributos del modelo
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
                        bebible: req.query.filter,
                    },
                    attributes: ['name', "photo", "summary", "price", "stock","bebible"], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
                    through: {
                        attributes: [],//traer mediante los atributos del modelo
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

// router.get('/:name', async (req, res) => {
//     const { name } = req.params;
//     if(name){
//         try{
//             let findName=await Menu.findAll({
//                 where:{
//                     name:{
//                         [Op.iLike]: `%${name}%`
//                     }
//                 },
//                 include:Food
//             })
//             res.status(201).send(findName);
//     }catch(error){
//         return res.status(400).json("error "+error.message)
//     }
    
// }})

router.post('/createmenu', async (req, res, next) => {   // Crea menu
    const { name, photo, description } = req.body;
    try {
    findname = await Menu.findOne({
        where: {
            name: name
        }
    });
    if (findname) {
        return res.status(400).send("Menu already exists");
    }
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

module.exports = router;