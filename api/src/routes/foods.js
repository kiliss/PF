const express = require('express');
const router = express.Router();
const {Food} = require('../db.js');

const allFoods = async () => {
    const foods = await Food.findAll();

    const newFood = await foods.map((e) => {
        return {
            id: e.id,
            name: e.name,
            photo: e.photo,
            summary: e.summary,
            price: e.price,
            stock: e.stock
        }
    })
    return newFood;
}


router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    if(id){
        try{
        const food = await allFoods()
        res.json(food.find(f => f.id === parseInt(id)));
        } catch(error) {
            next(error)
        }
    } else {
        try{
        Food.findAll({
            where: {id: id}
        })
        .then(r => res.send(r))
    }catch(error){
        next(error)
    }
    }
    
});

router.post('/', async (req, res, next) => {          // crear comida
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


 
router.post('/tomenu', async (req, res, next) => {  // Agrega comidas existentes a menus existentes
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

router.delete("/:id",async (req,res)=>{
    try {
        const id=req.params;
        const foodToDelete=await Food.findByPk(id)
        if(foodToDelete!==null){
            await foodToDelete.destroy();
            res.json("food borrada")
        }
    } catch(e) {
        return res.status(404).json("error "+e)
    }
})



module.exports = router;