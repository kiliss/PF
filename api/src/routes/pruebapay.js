const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe('sk_test_51LkeM7HwicqFBY9CvhpW0ywidCWD2TzfZhtCDPpzcuGJNbltFpJ5R2AUKTQCbUzXMpQhyFffvClJFBX65CAw0j1Y00u7jKOQPs')

router.post('/', async (req, res) =>{

    try {
        const { id, amount} = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Auriculares HyperX Cloud Flight",
        payment_method: id,
        confirm: true
    })

    console.log(payment)
    res.send({message: "Successfull payment"})
    } catch (error) {
        res.json({message: error.raw.message})
    }
})

module.exports = router
