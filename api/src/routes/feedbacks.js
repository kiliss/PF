const express = require('express');
const router = express.Router();
const { Feedback, User, Bill, Order } = require('../db.js');

router.get('/', async (req, res) => {
    try {
        const allFeedbacks = await Feedback.findAll({
            attributes: ['id', 'valoration', 'comment'],
            include:{
                model: User,
                attributes:['id', 'user'],
                model: Bill,
                attributes:['date', 'total_price','id_Order']
            }
        })
        res.status(200).json(allFeedbacks)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Aun no hay feedbacks"})
    }
})

router.post('/', async (req, res) => {
    const {valoration, comment, id} = req.body;
    try {
        const addFeedback = await Feedback.create({
            valoration,
            comment
        })

        const findBill = await Bill.findOne({
            where:{
                id: id
            }
        })

        addFeedback.addBill(findBill);
        res.status(200).json("Feedback agregado correctamente")
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Error al agregar feedback"})
    }
})

module.exports = router;