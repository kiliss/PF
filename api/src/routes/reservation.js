const express = require('express');
const router = express.Router();
const {Reservation,User,Table} = require('../db.js');
const { sendEmail } = require('../auth/mailer');
const { isUser, isAdmin } = require("../middleware/auth.js");


const getReservation=async()=>{
    const fecha=new Date()
    const actualFecha=`${fecha.getFullYear()}-${fecha.getMonth()+1}-0${fecha.getDate()}`;
    const fechaActualAño = actualFecha.slice(0,4);
    const fechaActualMes = actualFecha.slice(5,7);
    const fechaActualDia = actualFecha.slice(8,10);
    const reservas = await Reservation.findAll({
        include:[{
            model:User,
            attributes:['user','email', 'photo'],
        },{
            model:Table
        }]
    })
    reservas.map(r=>{
        const dia = r.dataValues.date.slice(8,10);
        const mes = r.dataValues.date.slice(5,7);
        const año = r.dataValues.date.slice(0,4);
        if(año<fechaActualAño){
            Reservation.destroy({
                where:{
                    id:r.dataValues.id
                }
            })
        }
        if(año==fechaActualAño && mes<fechaActualMes){
            Reservation.destroy({
                where:{
                    id:r.dataValues.id
                }
            })
        }
        if(año==fechaActualAño && mes==fechaActualMes && dia<fechaActualDia){
            Reservation.destroy({
                where:{
                    id:r.dataValues.id
                }
            })
        }
    })
    return reservas
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
         await Reservation.destroy({where:{
            id
         }})
        
        res.json("Reservation deleted correctly");
      
    } catch (e) {
      return res.status(404).json("Error ---> " + e);
    }
  });
  
module.exports = router;