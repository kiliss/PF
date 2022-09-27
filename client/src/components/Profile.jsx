import React from 'react';
// import style from "./style/Profile.module.css";
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProfile, getReservationByUser, getReservations, getUserDetail, getUsers } from '../redux/actions';
import jwt_decode from "jwt-decode";

const Profile = () => {
    const dispatch = useDispatch();
    // traer datos de user
    const navigate = useNavigate()

    

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    
    const usuarioo = jwt_decode(localStorage.getItem('user'))
    const usuario = useSelector((state) => state.user)

    return (
        <div>
            {
            Object.keys(usuarioo).length ? 
                <div className="bg-gray-100 min-h-screen pt-16">
                <div className="text-center text-3xl sm:text-5x1 md:text-7x1 font-['Cabin_Sketch'] pb-5">
                    Perfil
                </div>
                <div className='flex justify-center'>
                    <div className='w-full max-w-7xl shadow-xl px-auto sm:px-40 md:px-40 lg:px-40'>
                        <div className='lg:grid lg:grid-cols-2 gap-x-6'>
                            <div className='text-center my-2'>
                                <img className='m-auto h-64 w-64 rounded-full' src={usuarioo.photo} alt="Image Not Found" />
                                <h2 className='text-2xl'>{usuario.user}</h2>
                            </div>
                            <div className=''>
                                <div className='bg-gray-200 p-5 rounded-[15px]'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='font-bold'>NOMBRE: <span className='font-normal'>{usuario.user}</span> </h3>
                                        <h3 className='font-bold'>EMAIL: <span className='font-normal'>{usuarioo.email}</span></h3>
                                    </div>
                                    <div>
                                        <button className='bg-gray-200 hover:bg-gray-400 h-10 w-10 flex justify-center items-center rounded-full border-none'><img className='max-h-8 max-w-8' src='https://cdn-icons-png.flaticon.com/128/15/15185.png'/> </button>
                                    </div>
                                </div>
                                <div className='mt-10'>
                                    <h3 className='font-bold'>RESERVAS: </h3>
                                        {
                                            usuario.hasOwnProperty("reservations") && usuario.reservations.length ? 
                                            usuario.reservations.map((el) => {
                                                return (
                                                    <ul key={`reserva${el.id}`} className='flex flex-col bg-gray-300 rounded-[15px]'>
                                                    <li>
                                                        <div className='flex justify-between m-2'>
                                                        <span className='max-w-xs'>Reserva el día {el.date.slice(0,10)} a las {el.hour.slice(0,5)} en la mesa {el.tables[0].num_Table}</span>
                                                        <button className='bg-red-700 hover:bg-red-900 text-white rounded-full max-w-sm max-h-6 px-2'>Cancelar</button>
                                                        </div>
                                                    </li>
                                                    </ul>
                                                )
                                            })
                                           : <span>No tienes reservas</span>
                                        } 
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <p>No existe un usuario con ese ID</p>
            </div>
            }
        </div>
    )
}

export default Profile;