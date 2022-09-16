/*import React, { useEffect, useState } from "react";
import style from "./style/Reservation.module.css";
import { useDispatch, useSelector } from "react-redux";
const Reservations = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        date: "",
        hour: "",
        price: "",
        id_Table: "",
        id_User:"",
    })
    const [errors,setErrors]=useState({});
    const  table=useSelector((state)=>state.table).sort((a,b)=>a.num_Table.localeCompare(b.num_Table))
    useEffect(()=>{
        dispatch()
    })
    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validationForm(input))
        const errors = validationForm(input)
        if (Object.values(errors).length === 0) {
            dispatch(createReservation(input));
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            alert("Please complete all the entries before reservate a table")

        }
    }
        
    return (
        <div className={style.container}>
            Reservations
            <form className={create-form} onSubmit={(e) => handleSubmit(e)}>
                <h1 className={create-title}>reservate your table</h1>
                <input className={input-form}
                 type="text"
                 name='hour'
                 value={input.hour}
                 placeholder='select a hour'
                  /> <input
                  className='input-form'
                  type='number'
                  name='number of chairs'
                  placeholder='Enter the number of chairs'
                  onChange={handleChange}
                />{errors.duration && <p className='form-error'>{errors.duration}</p>}
                    <select
              className='select-form'
              name='table'
              placeholder='Select table'
              onChange={(e) => handleSelect(e)}>
              <option hidden value=''>
                Select table
              </option>
              {table.map((e) => (
                <option key={e.id} value={e.num_Table} name={e.num_Table}>
                  {e.num_Table}
                </option>
              ))}
            </select>
            {errors.table && <p className='form-error'>{errors.table}</p>}
            
            <button className='btn-submit' type='submit'>
              reservate
            </button> 
            </form>
        </div>
    )
}
const validationForm=(input)=>{
    let errors={};    
    if(!input.date){
        errors.date="the date is required"
    }
    if(!input.hour){
        errors.date="the hour is required"
    }
    if(!id_Table){
        errors.id_Table="the number of the table is required"
    }
    if(!input_User){
        errors.id_User="you have to login to reservate"
    }
    if(!price){
        errors.price="you have to pay to reservate"
    }
}


export default Reservations;*/