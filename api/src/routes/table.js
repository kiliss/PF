const express = require('express');
const router = express.Router();
const {Table,User,Reservation} = require('../db.js');



const getTable=async()=>{
    return await Table.findAll({
     include:{
            model:Reservation,
        //     attributes:['date','hour','price'],
        //     through:{
        //         attributes:['num_Table','state','chairs']
        //     }
         }
    })
}

router.get("/table",async (req,res)=>{
    res.json(await getTable())
})

router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const table=await Table.findByPk(id/*,{
            include:{
                model:User
            }
        }*/)
        if(table===null){
            res.status(404).json("Error in user by id")
        }
        else{
            res.status(200).json(table)
        }
       
    }catch(error){
        console.log("/routes/table/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})

router.post('/', async (req,res)=>{
    const {num_Table,state,chairs}=req.body;
    try{
        let mesaExiste = await Table.findOne({
            where:{
                num_Table: num_Table,
            }

        })
        if(mesaExiste){
            throw new Error("La mesa ya existe")
        } else {
        const table=await Table.create({
            num_Table:num_Table,
            state:state,
            chairs:chairs
        }        
        )

       // console.log(table)
        res.status(200).json("La mesa ha sido creado correctamente")
    } 
    }catch(error){
        res.status(400).json(error.message)
    }
})
router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const table=await Table.findByPk(id)
        if(table===null){
            res.status(404).json("Error in table by id")
        }
        else{
            await table.destroy()
            res.status(200).json("La mesa ha sido eliminado correctamente")
        }
       
    }catch(error){
        console.log("/routes/table/:id delete error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const {num_Table,state,chairs}=req.body;
    try{
        const table=await Table.findByPk(id)
        if(table===null){
            res.status(404).json("Error in table by id")
        }
        else{
            await table.update({
                num_Table:num_Table,
                state:state,
                chairs:chairs
            })
            res.status(200).json("La mesa ha sido actualizado correctamente")
        }
       
    }catch(error){
        console.log("/routes/table/:id put error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
    }
})


module.exports = router;