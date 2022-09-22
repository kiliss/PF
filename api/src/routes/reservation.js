const express = require('express');
const router = express.Router();
const {Reservation,User} = require('../db.js');


const getReservation=async()=>{
    return await Reservation.findAll({
       /* include:{
            model:User,
            attributes:['user','password','email','photo','admin'],
            */through:{
                attributes:['id_User','id_Table','date','hour','price','Cant_User']
            }
        
    })
}

router.get("/users",async (req,res)=>{
    res.json(await getReservation())
})

router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const reservations=await Reservation.findByPk(id/*,{
            include:{
                model:User
            }
        }*/)
        ?res.status(200).json(reservations)
        :res.status(404).json("Error in user by id")
    }catch(error){
        console.log("/routes/reservation/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})

router.post('/', async (req,res)=>{
    const {id_User,id_Table,date,hour,price,Cant_User}=req.body;
    try{
        const reservation=await Reservation.create({
            //id_User:id_User,
            //id_Table:id_Table,
            date:date,
            hour:hour,
            price:price,
            //Cant_User:Cant_User
        }
        )
        res.status(200).json("La reservación ha sido creado correctamente")
           
    }catch(error){
        res.status(403).json(error)
    }
})


module.exports = router;