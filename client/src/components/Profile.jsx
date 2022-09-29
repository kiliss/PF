import React from 'react';
// import style from "./style/Profile.module.css";
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProfile, getReservationByUser, getReservations, getUserDetail, getUsers,deleteReservation, putUserName, putUserPasswd, putUserPhoto } from '../redux/actions';
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';
import { useState } from 'react';
import image from "../assets/profile/uploadimage.png" 
import image2 from "../assets/profile/hamburguesa.png"
import image3 from "../assets/profile/checked.png"
import image4 from "../assets/profile/padlock.png"
const Profile = () => {
    const dispatch = useDispatch();
    // traer datos de user
    const navigate = useNavigate()

    

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    
    const handleDelete =async (e,id)=>{
        e.preventDefault();
        swal({
            title: "Esta seguro que desea eliminar la reservacion?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
        if(willDelete){
            dispatch(deleteReservation(id))
            dispatch(getProfile())
            swal({
                title: "reserva eliminada",
                icon: "success",
                button: "Aceptar",
            });
        }
    })}
    
    const usuarioo = jwt_decode(localStorage.getItem('user'))
    const usuario = useSelector((state) => state.user)
    console.log(usuarioo)
    
    // CAMBIO DE NOMBRE DE USUARIO
    const [inputUser, setInputUser] = useState({
        id: usuarioo.id,
        name: ""
    })

    function handleChangeName(e){
        setInputUser({
            ...inputUser,
            [e.target.name] : e.target.value
        })
    }
    function changeName(e){
        e.preventDefault()
        dispatch(putUserName(inputUser))
    }

    // CAMBIO DE CONTRASEÑA
    const [inputPasswd, setInputPasswd] = useState({
        id: usuarioo.id,
        password: "",
        repassword: ""
    })

    function handleChangePasswd(e){
        setInputPasswd({
            ...inputPasswd,
            [e.target.name] : e.target.value
        })
    }
    function changePasswd(e){
        e.preventDefault()
        if(inputPasswd.password === inputPasswd.repassword){
            dispatch(putUserPasswd(inputPasswd))
        } else {
            swal({
                title: "Las contraseñas no coinciden",
                text: "",
                icon: "error",
                button: "Aceptar",
            })
        }
    }

    // CAMBIO DE IMAGEN
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Foodss");
        setLoading(true);
        const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzvqedesg/image/upload",
        {
            method: "POST",
            body: data,
        }
        );
        console.log(photo)
        const file = await res.json();
        setPhoto(file.secure_url);
        setLoading(false);
    };

    function changePhoto(e){
        e.preventDefault()
        dispatch(putUserPhoto({
            id: usuarioo.id,
            photo: photo 
        }))
    }

    // PASSWORD PREVIEW
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
      };
    const [rePasswordShown, setRePasswordShown] = useState(false);
    const toggleRePassword = () => {
        setRePasswordShown(!rePasswordShown);
      };
    
       
    return (
        <div class="container mx-auto my-40">
        <div>

            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                <div className="flex justify-center">
                    {
                        !photo ?
                        <img src={usuarioo.photo} alt="" class="rounded-full mx-auto absolute -top-20 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                        : <img src={photo} alt="" class="rounded-full mx-auto absolute -top-20 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                    }
                </div>
                <div className='flex justify-center mt-16'>
                    <div className='flex items-center justify-end w-56'>
                    <label className="">
                    <img src={image} alt="" className='cursor-pointer mr-2'/>
                    <input name="photo" type="file" onChange={uploadImage} className="sr-only"/>
                </label>
                <button disabled={!photo} onClick={(e) => changePhoto(e)} className='font-bold text-1xl bg-red-700 enabled:hover:bg-red-900 text-white px-2 h-6 rounded-full'>✓</button>
                    </div>
                </div>
                
                <div class=" mt-3">
                <div className='flex justify-center items-center px-6 text-center'>
                    <h3 className='font-bold border-b border-teal-500'><input className='text-center text-2xl placeholder-black w-40' name="name" value={inputUser.user} type="text" placeholder={usuario.user} onChange={(e)=> handleChangeName(e)}/> </h3>
                    <button className='font-bold text-1xl bg-red-700 enabled:hover:bg-red-900 text-white px-2 h-6 rounded-full' disabled={inputUser.name.length < 1} onClick={(e) => changeName(e)}> ✓
                    {/* <img src={image3} alt=""/> */}
                    </button>
                </div>
                <div className='flex justify-center items-center mt-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p class="text-center text-sm text-black font-medium ml-1"> {usuarioo.email}</p>
                </div>
                    <div className='flex flex-col my-5 mx-5'>
                        <h3 className='flex items-center font-bold max-w-fit mb-1'>
                            <img src={image4} alt="" className='h-5'/> 
                            <div className="flex justify-end items-center relative">
                            <input className='text-start pl-[7px] rounded-lg border-2 border-gray-500 w-48' name="password" value={inputPasswd.password} type={passwordShown ? "text" : "password"} placeholder="Nueva contraseña" onChange={(e)=> handleChangePasswd(e)}/>
                            <button className="absolute px-1" onClick={togglePassword}>{passwordShown === false ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg> 
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>}
                            </button>
                            </div>
                        </h3>
                        <h3 className='flex items-center font-bold max-w-fit mb-1'>
                            <img src={image4} alt="" className='h-5'/> 
                            <div className="flex justify-end items-center relative">
                            <input className='text-start pl-[7px] rounded-lg border-2 border-gray-500 w-48' name="repassword" value={inputPasswd.repassword} type={rePasswordShown ? "text" : "password"} placeholder="Repetir contraseña" onChange={(e)=> handleChangePasswd(e)}/> 
                            <button className="absolute px-1" onClick={toggleRePassword}>{rePasswordShown === false ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg> 
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>}
                            </button>
                            </div>
                        </h3>
                        <button disabled={inputPasswd.password.length < 1 && inputPasswd.repassword.length < 1} onClick={(e) => changePasswd(e)} className='bg-red-700 enabled:hover:bg-red-900 text-white rounded-full w-24 px-2'>Actualizar</button>
                    </div>

                    <div class="w-full">
                        <h3 class="font-medium text-gray-900 text-left px-6">Reservas</h3>
                        {
                                            usuario.hasOwnProperty("reservations") && usuario.reservations.length ? 
                                            usuario.reservations.map((el) => {
                                                const date = el.date.slice(0,10) 
                                                const anio = date.slice(0,4)
                                                const mes = date.slice(4,8)
                                                const dia = date.slice(8,10)
                                                const fecha = dia+mes+anio
                                                return (
                                                    <ul key={`reserva${el.id}`} className='flex flex-col bg-gray-100 rounded-[15px]'>
                                                    <li>
                                                        <div class="w-full border-t rounded-[15px] border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-300 transition duration-150">
                                                        <img src={image2} alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
                                                        <span className='max-w-xs'>Reserva el día {fecha} a las {el.hour.slice(0,5)} en la mesa {el.tables[0].num_Table}</span>
                                                        <button onClick={(e)=>handleDelete(e,el.id)} className='bg-red-700 hover:bg-red-900 text-white rounded-full max-w-sm max-h-6 px-2 ml-2'>Cancelar</button>
                                                        </div>
                                                    </li>
                                                    </ul>
                                                    
                                                )
                                            })
                                           : <div class="w-full border-t rounded-[15px] border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-300 transition duration-150">
                                           <img src={image2} alt="" class="rounded-full h-6 inline-block mr-2"/>
                                           <span>No tienes reservas</span>
                                           </div>
                                        } 
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default Profile;