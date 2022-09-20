const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {Order,Bill,Table,Foodcount } = require('../db.js');


router.get('/',async (req,res)=>{
    try{
        const allOrder=await Order.findAll({
            attributes:['id','observation','state'],
            include:{
                model:Bill,
                attributes:['id','date','total_price','id_User','id_Order','pay_method'],
                model:Table,
                attributes:['num_Table','state','chairs'],
                model: Foodcount,
                attributes:['id','quantity']
            }
        })
        res.status(200).json(allOrder)
    }catch(error){
        console.log(error);
        res.status(400).json({error:"Aun no hay Orders"})
    }
})
router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const order=await Order.findByPk(id,{
            include:{
                model:Bill,
                model:Table
            }
        })
        if (order==null){
            res.status(404).json("ther is not a bill with the id")
        }else {
            res.status(200).json(order)  
        }       
        
    }catch(error){
        console.log("/routes/order/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})
router.post ('/', async(req,res)=>{
    const  {observation,state}=req.body;
    try{
        const order=await Order.create({
            observation:observation,
            state:state
        }) 
         res.status(200).json("La order ha sido creado correctamente")
        
     }catch(error){
        res.status(403).json(error)
}})

module.exports=router