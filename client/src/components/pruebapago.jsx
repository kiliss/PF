import React from "react";
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51LkeM7HwicqFBY9CPHk3MavK9EF4OJ9ioOHqFe7qkgcUkFdIm5cXzJQSfCqpQui3wfeCsYRCzVL40sijRPLVXYa000iIVjrtba")

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const {error, paymentMethod} =  await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) // esto es como un getElementByID
    });
    setLoading(true);

    if (!error) {
        const { id } = paymentMethod;
          console.log(paymentMethod)
        const { billing_details } = paymentMethod
        console.log(billing_details)
        
        try {
            const { data } = await axios.post("/pay", {
                id,
                amount: 1000 // lo obtiene en centavos
              });
              console.log(data)
        
              elements.getElement(CardElement).clear();
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
  };

  return <div class="w-full max-w-xs">
        <form onSubmit={handleSubmit} class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <img 
        src='http://cdn.shopify.com/s/files/1/0564/3612/9997/products/hyperx_cloud_20flight_1_main.jpg?v=1662435222'
        alt='hyperx cloud flight'/>

        <h3 className="text-center my-2">Price: $1.000</h3>

        <div>
        <CardElement/>
        </div>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-10" disabled={!stripe}>
            {loading ? (
                <span>Loading...</span>
            ): (
                "Buy"
            )}
        </button>
        </form>
    </div>
  
}

function PruebaPago() {
  return (
    <Elements stripe={stripePromise}>
      <div class="flex justify-center"> 
        <div> 
          <div> 
          <CheckoutForm/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default PruebaPago;
