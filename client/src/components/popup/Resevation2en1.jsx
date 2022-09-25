import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createReservation, getProfile, getReservationDetail, getReservations, getTable } from '../../redux/actions/index';
import { useEffect } from "react";
import { useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import swal from "sweetalert";

const validationForm = (input) => {
    let errors = {};

    if (!input.date) {
        errors.date = "Date required"
    }
    if (!input.hour) {
        errors.hour = "Hour is required"
    }
    if (!input.num_Table) {
        errors.num_Table = "SELECT A TABLE PLEASE"
    }
    if (input.num_Table > 1) {
        errors.num_Table = "SELECT ONLY ONE TABLE PLEASE"
    }
    return errors
};

// console.log(PruebaPago().props)
const stripePromise = loadStripe("pk_test_51LkeM7HwicqFBY9CPHk3MavK9EF4OJ9ioOHqFe7qkgcUkFdIm5cXzJQSfCqpQui3wfeCsYRCzVL40sijRPLVXYa000iIVjrtba")

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTable())
    dispatch(getProfile())
    dispatch(getReservations())
}, [dispatch])


  const tables = useSelector((state) => state.tables);
  const usuario = useSelector((state) => state.user);
  const reserva = useSelector((state) => state.reservations);
//   console.log(reserva)
  console.log(usuario.user)

  const [input, setInput] = useState({
    id_User: usuario.user,
    date: "",
    hour: "",
    price: 300,
    num_Table: [],
})
  const [errors, setErrors] = useState({});

  console.log(input)

  function handleChange(e) {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
      setErrors(validationForm({
          ...input,
          [e.target.name]: e.target.name
      })
      )
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();

    setErrors(validationForm(input))
      const errors = validationForm(input)
      console.log(errors);
      if (Object.values(errors).length) {
          swal({
              title: "Por favor complete los campos a llenar",
              icon: "warning",
              buttons: "aceptar",
          })
      } else {
        
    
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
                amount: input.price*100 // lo obtiene en centavos
              });
              console.log(data.data.message)
        
              elements.getElement(CardElement).clear();
              if (data.data.message === "Successfull payment"){
                swal("Pago aceptado", "Tu reserva fue registrada con éxito", "success");
                dispatch(createReservation(input));
                setTimeout(function(){
                    navigate("/")
                }, 1500)
              } else if(data.data.message === "Your card's security code is incorrect."){
                swal("Pago rechazado", "Código de seguridad invalido", "error");
              } else if(data.data.message === "Your card has insufficient funds."){
                swal("Pago rechazado", "Fondos insuficientes", "error");
              }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }}
  };
  
  return (
    
    <div className="w-full max-w-4xl mt-20">
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="-mx-3 flex flex-wrap w-3/4">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="date"
                            className="mb-3 block text-base font-medium text-[#07074D]" >
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            min="2022-09-21"
                            max="2025-04-30"
                            value={input.date}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        /> {errors.date && <p className='form-error'>{errors.date}</p>}
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="time"
                            className="mb-3 block text-base font-medium text-[#07074D]" >
                            Hora
                        </label>
                        <input
                            type="time"
                            step="3600000"
                            name="hour"
                            id="hour"
                            value={input.hour}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        /> {errors.hour && <p className='form-error'>{errors.hour}</p>}
                    </div>
                </div>
            </div>
            <div className="-mx-3 flex flex-wrap w-3/4">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="guest"
                            className="mb-3 block text-base font-medium text-[#07074D]" >
                            Asientos
                        </label>
                        <input
                            type="number"
                            name="guest"
                            id="guest"
                            placeholder="2"
                            min="2"
                            max="4"
                            onChange={handleChange}
                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label
                            htmlFor="table"
                            className="mb-3 block text-base font-medium text-[#07074D]" >
                            Mesas (Disponibles)
                        </label>
                        <select
                            id="table"
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                            {
                                tables.length ?
                                    tables.map((table) => (
                                        <option key={`reservation-${table.num_Table}`} value={table.num_Table}>{`Mesa ${table.num_Table}`}</option>
                                    ))
                                    :
                                    <option value={0}>Intente Otro Horario</option>
                            }
                        </select> {errors.num_Table && <p className='form-error'>{errors.num_Table}</p>}
                    </div>
                </div>
            </div>
            <div className="w-72">
            <h3 className="text-center my-2">${input.price}</h3>
                <CardElement/>
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold w-32 py-2 px-4 border border-blue-700 rounded mx-10" disabled={!stripe}>
                    {loading ? (
                        <span>...</span>
                    ): (
                        "Reservar"
                    )}
                </button>
        </form>
    </div>
    )
  
}




function Reservation(props) {
    return (

        <Elements stripe={stripePromise}>
            <div className="flex justify-center"> 
                <div className="w-3/5"> 
                <div> 
                <CheckoutForm/>
                </div>
                </div>
            </div>
        </Elements>
    )
}


export default Reservation