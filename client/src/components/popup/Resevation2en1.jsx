import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReservation, getProfile, getReservations, getTable } from '../../redux/actions/index';
import { useEffect } from "react";
import { useState } from "react";
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import swal from "sweetalert";
import jwt_decode from "jwt-decode"

const validationForm = (input) => {
    let errors = {};
    const fecha=new Date()
    const actualFecha=`${fecha.getFullYear()}-${fecha.getMonth()+1}-0${fecha.getDate()}`
    const hora=fecha.getHours()
    if (!input.date) {
        errors.date = "Date required"
    }
    if(input.date===actualFecha && input.hour.slice(0,1)<=hora){
        errors.hour="please insert a correct hour"
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
    if(input.chairs<1||input.chairs>10){
        errors.chairs="PLEASE SELECT A VALID NUM OF CHAIRS (1-10)"
    }
    return errors
};

const stripePromise = loadStripe("pk_test_51LkeM7HwicqFBY9CPHk3MavK9EF4OJ9ioOHqFe7qkgcUkFdIm5cXzJQSfCqpQui3wfeCsYRCzVL40sijRPLVXYa000iIVjrtba")

const CheckoutForm = () => {
    const fecha=new Date()
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
    const [invisible]=useState(false)
    const [visible]=useState(true)
  useEffect(() => {
    dispatch(getTable())
    dispatch(getProfile())
    dispatch(getReservations())
}, [dispatch])


  const tables = useSelector((state) => state.tables);
 
//   const decode = window.localStorage.getItem("user");
  const decodee = jwt_decode(localStorage.getItem('session'))

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
console.log(input)

  const [errors, setErrors] = useState({});
  // eslint-disable-next-line array-callback-return
  const mesasFiltradas=tables.filter((t)=>{

    if(input.guest) {
                
       
      
       if(t.reservations[0]){
        t.reservations.forEach((e)=>{
            if(e.date===input.date&&e.hour.slice(0,5)===input.hour){
             
                 t.state=invisible  
                  
        }if(e.date===input.date&&e.hour.slice(0,5)!==input.hour){
            t.state=visible
        }
        if(e.date!==input.date&&e.hour.slice(0,5)===input.hour){
            t.state=visible
        }
    }
        )
       }

         // eslint-disable-next-line eqeqeq
        if( t.chairs==input.guest){
            const mesa=t
            return mesa
        }
       }})    
      
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
  function handleChangeAsientos(e) {
      setInput({
          ...input,
          id_Table: "" ,
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
                    dispatch(createReservation(input)).then((a) => {
                        if(a.data === "Error creando la reservacion, intente nuevamente mas tarde"){
                            swal({
                                title: "Error creando la reservacion, intente nuevamente mas tarde",
                                text: "Por favor, comuniquese con nosotros",
                                icon: "warning",
                                buttons: "aceptar",
                            })
                        } else if(a.data === "La reservación ha sido creado correctamente"){
                        navigate("/")
                        }
                    })
                })
              } else if(data.data.message === "Your card's security code is incorrect."){
                swal("Pago rechazado", "Código de seguridad invalido", "error");
              } else if(data.data.message === "Your card has insufficient funds."){
                swal("Pago rechazado", "Fondos insuficientes", "error");
              } else if(data.data.message === "Your card has expired."){
                swal("Pago rechazado", "Tu tarjeta expiró", "error");
              } else if(data.data.message === "Error creando la reservacion, intente nuevamente mas tarde"){
                swal("Error", "Error creando la reservacion, intente nuevamente mas tarde", "error");
              } else if(data.data.message === "Your card was declined. Your request was in test mode, but used a non test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."){
                swal("Pago rechazado", "Tu tarjeta no es de prueba", "error");

              }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }else if(error.message === "El año de caducidad de la tarjeta ya ha pasado." || error.message === "El año de caducidad de la tarjeta no es válido." || error.message === "La fecha de caducidad de tu tarjeta ya ha pasado."){
        swal("Revise los campos de su tarjeta", "El año de caducidad no es valido", "warning")
    }else if(error.message === "El número de tu tarjeta está incompleto."){
        swal("Revise los campos de su tarjeta", "El número de tu tarjeta está incompleto", "warning")
    }else if(error.message === "Tu código postal está incompleto."){
        swal("Revise los campos de su tarjeta", "Tu código postal está incompleto", "warning")
    }else if(error.message === "La fecha de caducidad de tu tarjeta está incompleta."){
        swal("Revise los campos de su tarjeta", "La fecha de caducidad de tu tarjeta esta incompleta", "warning")
    }else if(error.message === "El código de seguridad de tu tarjeta está incompleto."){
        swal("Revise los campos de su tarjeta", "El código de seguridad de tu tarjeta esta incompleto", "warning")
    }
  };
  }

  let mañana = new Date(fecha.setDate(fecha.getDate() + 1));

  mañana = `${fecha.getFullYear()}-${fecha.getMonth()+1}-0${fecha.getDate()}`

    
  
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
                            min={mañana}
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
                        <select id="framework"
                          value={input.hour}
                          name="hour"
                          onChange={handleChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                <option value="hora" hidden>--:--</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>                
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>                
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                
            </select>{errors.hour && <p className='form-error'>{errors.hour}</p>}
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
                            placeholder="Seleccione sus asientos"
                            min="1"
                            max="10"
                            onChange={handleChangeAsientos}
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
                                     
                                        // eslint-disable-next-line array-callback-return
                                        mesasFiltradas.map(e=>{
                                           
                                            if(e.state===true){
                                                return(<option key={`reservation-${e.num_Table}`}  value={e.id}>{`Mesa ${e.num_Table}`}</option>) }
                                        })
                                    /*tables.map((table) => (
                                        

                                        
                                        <option key={`reservation-${table.num_Table}`}  value={table.id}>{`Mesa ${fitrado}`}</option>
                                    ))*/
                                    :
                                    <option value={0} disabled>Intente Otro Horario</option>
                            }
                        </select> {errors.num_Table && <p className='form-error'>{errors.num_Table}</p>}
                    </div>
                </div>
            </div>
            <div className="w-72">
            <h3 className="text-center my-2">${input.price}</h3>
                <CardElement/>
                </div>
                <button className="bg-green-500 enabled:hover:bg-green-700 text-white font-bold w-32 py-2 px-4 border border-blue-700 rounded mx-10" disabled={!stripe || !input.id_Table || !input.guest || loading}>
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
            <div className="flex justify-center h-screen"> 
                <div className="2xl:w-3/5 lg:w-3/5 xl:w-3/5 md:w-4/5 sm:w-4/5"> 
                <div> 
                <CheckoutForm/>
                </div>
                </div>
            </div>
        </Elements>
    )
}


export default Reservation