import React from 'react';
// import style from "./style/Profile.module.css";

const Profile = () => {
    // traer datos de user
    // traer datos de bill
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
             <div className="text-center text-3xl sm:text-5x1 md:text-7x1 font-['Cabin_Sketch'] pb-5">
                Perfil
            </div>
            <div className='grid mx-24'>
                <div className='lg:grid lg:grid-cols-2 gap-x-6'>
                    <div className='text-center '>
                        <img className='m-auto h-64 w-64 rounded-full' src="https://thumbs.dreamstime.com/b/icono-masculino-de-la-imagen-del-perfil-del-avatar-del-defecto-placeholder-gris-de-la-foto-del-hombre-88414414.jpg" alt="Image Not Found" />
                        <h2 className='text-2xl'>pepe</h2>
                    </div>
                    <div className=''>
                        <div className='bg-gray-200 p-5 rounded-[15px]'>
                        <div>
                            <h3 className='font-bold'>NOMBRE: <span className='font-normal'>pepe</span> </h3>
                            <h3 className='font-bold'>EMAIL: <span className='font-normal'>pepe@gmail.com</span></h3>
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
            {/* <div>
                <button>Config.</button>
            </div> */}
        </div>
    )
}

export default Profile;