import React from 'react';
// import style from "./style/Profile.module.css";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getUserDetail } from '../redux/actions';

const Profile = () => {
    const dispatch = useDispatch();
    // traer datos de user
    // const {id} = useParams()

    // useEffect(() => {
    //     dispatch(getUserDetail(id))
    // }, [dispatch, id])

    const usuario = useSelector((state) => state.user)
    console.log(usuario)

    // traer datos de bill
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
             <div className="text-center text-3xl sm:text-5x1 md:text-7x1 font-['Cabin_Sketch'] pb-5">
                Perfil
            </div>
            <div className='grid px-auto sm:px-40 md:px-40 lg:px-40'>
                <div className='lg:grid lg:grid-cols-2 gap-x-6'>
                    <div className='text-center'>
                        <img className='m-auto h-64 w-64 rounded-full' src="https://img1.freepng.es/20180429/xoq/kisspng-computer-icons-user-profile-5ae60b5b563cb3.3045472715250256273532.jpg" alt="Image Not Found" />
                        <h2 className='text-2xl'>pepe</h2>
                    </div>
                    <div className=''>
                        <div className='bg-gray-200 p-5 rounded-[15px]'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='font-bold'>NOMBRE: <span className='font-normal'>pepe</span> </h3>
                                <h3 className='font-bold'>EMAIL: <span className='font-normal'>pepe@gmail.com</span></h3>
                            </div>
                            <div>
                                <button className='bg-gray-200 rounded-full border-none'><img className='max-h-10 max-w-10' src='https://cdn-icons-png.flaticon.com/128/15/15185.png'/> </button>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <h3 className='font-bold'>HISTORIAL DE COMIDAS: </h3>
                            <ul className='flex flex-col bg-gray-300 rounded-[15px]'>
                                <li className='flex justify-between m-2'>
                                    <span>Hamburguesa completa $900</span>
                                    <button className='bg-red-700 hover:bg-red-900 text-white rounded-full w-24 '>Feedback</button>
                                </li> 
                                <li className='flex justify-between m-2'>
                                    <span>Milanesa a la napolitana con fritas $1400</span> 
                                    <button className='bg-red-700 hover:bg-red-900 text-white rounded-full w-24'>Feedback</button>
                                </li> 
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;