const express = require('express');
const router = express.Router();
const {Reservation,User,Table} = require('../db.js');
const { sendEmail } = require('../auth/mailer');
const { isUser, isAdmin } = require("../middleware/auth.js");


const getReservation=async()=>{
    return await Reservation.findAll({
            through:{
                attributes:['date','hour','price']
            },
            include:{
                model:User,
            }

    })
}

router.get("/users", isUser ,async (req,res)=>{
    res.json(await getReservation())
})

router.get("/:id", isUser,async(req,res)=>{
    const {id}=req.params;
    try{
        const reservations=await Reservation.findByPk(id,{
            include:{
                model:User
                }
        })
        ?res.status(200).json(reservations)
        :res.status(404).json("Error in user by id")
    }catch(error){
        console.log("/routes/reservation/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})

router.post('/', isUser, async (req,res)=>{
    const {id_User,id_Table,date,hour,price,Cant_User, email}=req.body;
    console.log(req.body)
    try{
        const reservation=await Reservation.create({
            date:date,
            hour:hour,
            price:price,
            //Cant_User:Cant_User
        })
        const table = await Table.findByPk(id_Table)
        const user = await User.findByPk(id_User)
        reservation.addTables([table])
        reservation.addUsers([id_User])
        res.status(200).json("La reservación ha sido creado correctamente")
        sendEmail(email, "Reserva PFRestaurante", `Estimado ${user.user}, gracias por realizar una reserva.\n\xA0 Lo estaremos esperando el día ${date} a las ${hour}.\n\xA0 No olvide que su mesa reservada es la Nº ${table.num_Table}`, "reservation")
        
    }catch(error){
        res.status(403).json(error)
    }
})

router.delete("/delete/:id", isUser, async (req, res) => {
    const { id } = req.params;
    try {
         let reserva= await Reservation.destroy({where:{
            id
         }})
        
        res.json("Reservation deleted correctly");
      
    } catch (e) {
      return res.status(404).json("Error ---> " + e);
    }
  });
  
module.exports = router;