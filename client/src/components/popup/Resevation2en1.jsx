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
import jwt_decode from "jwt-decode"

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
    if(input.chairs<2||input.chairs>4){
        errors.chairs="PLEASE SELECT A VALID NUM OF CHAIRS (2-4)"
    }
    return errors
};

const stripePromise = loadStripe("pk_test_51LkeM7HwicqFBY9CPHk3MavK9EF4OJ9ioOHqFe7qkgcUkFdIm5cXzJQSfCqpQui3wfeCsYRCzVL40sijRPLVXYa000iIVjrtba")

const CheckoutForm = () => {
    const fecha=new Date()
    const actualFecha=`${fecha.getFullYear()}-0${fecha.getMonth()+1}-${fecha.getDate()}`
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

 
//   const decode = window.localStorage.getItem("user");
  const decodee = jwt_decode(localStorage.getItem('user'))

  const [input, setInput] = useState({
    id_User: decodee.id,
    id_Table: "",
    date: "",
    hour: "",
    guest:"",
    price: 300,
    num_Table: [],
    email: decodee.email,
})
  const [errors, setErrors] = useState({});
  const mesasFiltradas=tables.filter((t)=>{

    if(input.guest) {
      if( t.chairs==input.guest){
         const mesa=t
         return mesa
     } }})
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
    

    if (!error) {
        setLoading(true);
        const { id } = paymentMethod;
        try {
            const data = await axios.post("/pay", {
                id,
                amount: input.price*100 // lo obtiene en centavos
              });
              elements.getElement(CardElement).clear();
              if (data.data.message === "Successfull payment"){
                swal("Pago aceptado", "Tu reserva fue registrada con éxito", "success").then(() => {
                    dispatch(createReservation(input))
                    navigate("/")
                })
              } else if(data.data.message === "Your card's security code is incorrect."){
                swal("Pago rechazado", "Código de seguridad invalido", "error");
              } else if(data.data.message === "Your card has insufficient funds."){
                swal("Pago rechazado", "Fondos insuficientes", "error");
              } else if(data.data.message === "Your card has expired."){
                swal("Pago rechazado", "Tu tarjeta expiró", "error");
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
                            min={actualFecha}
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
                            step="7200"
                            name="hour"
                            id="hour"
                            min="08.00" 
                            max="23:59" 
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
                            value={input.guest}
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
                            name="id_Table"
                            value={input.id_Table}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                            {
                                <option disabled value="">Seleccione mesa</option>
                            }
                            {
                                mesasFiltradas.length ?
                                     
                                        mesasFiltradas.map(e=>{
                                           return(<option key={`reservation-${e.num_Table}`}  value={e.id}>{`Mesa ${e.num_Table}`}</option>)
                                        })
                                    /*tables.map((table) => (
                                        

                                        
                                        <option key={`reservation-${table.num_Table}`}  value={table.id}>{`Mesa ${fitrado}`}</option>
                                    ))*/
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
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold w-32 py-2 px-4 border border-blue-700 rounded mx-10" disabled={!stripe || !input.id_Table || !input.guest || loading}>
                    {loading ? (
                        <span>...</span>
                    ): (
                        "Reservar"
                    )}
                    {/* Reservar */}
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