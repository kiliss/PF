const express = require('express');
const router = express.Router();
const {User,Feedback} = require('../db.js');


const getDbUsers=async()=>{
    return await User.findAll({
        include:{
            model:Feedback,
            attributes:['valoration','comment'],
            through:{
                attributes:['user','password','email','photo','admin']
            }
        }
    })
}

router.get("/users",async (req,res)=>{
    res.json(await getDbUsers())
})
router.get("/:id", async (req,res)=>{
    const {id}=req.params;
    try{
        const users=await User.findByPk(id,{
            include:{
                model:Feedback,
            }
        })
        ?res.status(200).json(users)
        :res.status(404).json("Error in user by id")
    } catch(error){
        console.log("/routes/users/:id get error",error);
      res.status(500).json({error:"ID_ERROR",description: "Error found ID"} )
        }
})

router.post('/', async (req, res) => {
    const {user, password, email, photo, admin} = req.body;
    try {
        const usser = await User.create({
            user: user,
            password: password,
            email: email,
            photo: photo,
            admin: admin
            })
            ?res.status(200).json("El usuario ha sido creado correctamente", usser)
           :res.status(403).json("El usuario no se ha creado");
    }catch (error) {
        res.status(403).json(error)
    }
})





module.exports = router;