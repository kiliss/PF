const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { Bill, Order } = require('../db.js');

const getBill=async ()=>{
    return await Bill.findAll({
        include:{
            model:Order,
            attributes:['id','observation','state'],
            through:{
                attributes:['id','date','total_price','id_User','id_Order','pay_method']
            }
        }
    })
}
router.get("/",async (req,res)=>{
    res.json(await getBill())
})

router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const bills=await Bill.findByPk(id,{
            include:{
                model:User
            }
        })
        if (bills==null){
            res.status(404).json("ther is not a bill with the id")
        }else {
            res.status(200).json(bills)  
        }       
        
    }catch(error){
        console.log("/routes/bill/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})
router.post('/', async (req,res)=>{
    const {id,date,total_price,id_User,id_Order,pay_method}=req.body;
    try{
        const bill=await Bill.create({
            id_User:id_User,
            id:id,
            date:date,
            total_price:total_price,
            id_Order:id_Order,
            pay_method:pay_method}
        )
        res.status(200).json("La reservación ha sido creado correctamente")
           
    }catch(error){
        res.status(403).json(error)
    }
})


module.exports = router;