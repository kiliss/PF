import React from "react";
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useState } from "react";
import swal from "sweetalert";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from "react";

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
          // console.log(paymentMethod)
        try {
            const data = await axios.post("/pay", {
                id,
                amount: 1000000 // lo obtiene en centavos
              });
              //console.log(data.data.message)
              //console.log(data.data)
              elements.getElement(CardElement).clear();
              if (data.data.message === "Successfull payment"){
                swal("Pago aceptado", "", "success");
              } else if(data.data.message === "Your card's security code is incorrect."){
                swal("Pago rechazado", "Código de seguridad invalido", "error");
              } else if(data.data.message === "Your card has insufficient funds."){
                swal("Pago rechazado", "Fondos insuficientes", "error");
              }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
  };
  
  return (
    
    <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-center my-2">$300</h3>

        <div className="w-72">
        <CardElement/>
        </div>
        <button  className="bg-green-500 hover:bg-green-700 text-white font-bold w-32 py-2 px-4 border border-blue-700 rounded mx-10" disabled={!stripe}>
            {loading ? (
                <span>Loading...</span>
            ): (
                "Pagar"
            )}
        </button>
        </form>
    </div>
    )
  
}

function PruebaPago(props) {
  return (
    <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-120 transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                <div className="relative flex w-full items-center overflow-hidden bg-white rounded-lg">
                                    <div className="flex w-full items-center justify-center">

                                        <div className="mx-auto w-full bg-white">

                                            <div
                                                className="flex w-full items-center justify-between py-4 px-9 border-b border-gray-200"
                                            >
                                                <h3 className="text-xl font-bold text-red-700">¿Desea reservar?</h3>
                                                { <button onClick={() => props.setOpen(false)} className="text-gray-400 hover:text-gray-500">
                                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                                </button> }
                                            </div>
                                              <Elements stripe={stripePromise}>
                                                <div className="flex justify-center"> 
                                                  <div> 
                                                    <div> 
                                                    <CheckoutForm/>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Elements>
                                              </div>
                                              </div>
                                              </div>
                                </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
  );
}

export default PruebaPago;

