import React from 'react';
// import style from "./style/Profile.module.css";
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProfile, getUserDetail, getUsers } from '../redux/actions';

const Profile = () => {
    const dispatch = useDispatch();
    // traer datos de user
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    
    const usuario = useSelector((state) => state.user)

    // traer datos de bill
    return (
        <div>
            {
            Object.keys(usuario).length ? 
                <div className="bg-gray-100 min-h-screen pt-16">
                <div className="text-center text-3xl sm:text-5x1 md:text-7x1 font-['Cabin_Sketch'] pb-5">
                    Perfil
                </div>
                <div className='grid px-auto sm:px-40 md:px-40 lg:px-40'>
                    <div className='lg:grid lg:grid-cols-2 gap-x-6'>
                        <div className='text-center'>
                            <img className='m-auto h-64 w-64 rounded-full' src={usuario.photo} alt="Image Not Found" />
                            <h2 className='text-2xl'>{usuario.user}</h2>
                        </div>
                        <div className=''>
                            <div className='bg-gray-200 p-5 rounded-[15px]'>
                            <div className='flex justify-between'>
                                <div>
                                    <h3 className='font-bold'>NOMBRE: <span className='font-normal'>{usuario.user}</span> </h3>
                                    <h3 className='font-bold'>EMAIL: <span className='font-normal'>{usuario.email}</span></h3>
                                </div>
                                <div>
                                    <button className='bg-gray-200 hover:bg-gray-400 h-10 w-10 flex justify-center items-center rounded-full border-none'><img className='max-h-8 max-w-8' src='https://cdn-icons-png.flaticon.com/128/15/15185.png'/> </button>
                                </div>
                            </div>
                            <div className='mt-10'>
                                <h3 className='font-bold'>HISTORIAL DE COMIDAS: </h3>
                                <ul className='flex flex-col bg-gray-300 rounded-[15px]'>
                                    <li>
                                        <div className='flex justify-between m-2'>
                                            <span className='max-w-xs'>Hamburguesa completa $900</span>
                                            <button className='bg-red-700 hover:bg-red-900 text-white rounded-full max-w-sm max-h-6 px-2'>Feedback</button>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className='flex justify-between m-2'>
                                            <span className='max-w-xs'>Milanesa a la napolitana con fritas $1400</span> 
                                            <button className='bg-red-700 hover:bg-red-900 text-white rounded-full max-w-sm max-h-6 px-2'>Feedback</button>
                                        </div>
                                    </li> 
                                </ul>
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