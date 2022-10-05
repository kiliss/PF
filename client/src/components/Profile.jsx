import React from 'react';
// import style from "./style/Profile.module.css";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getReservations, getProfile, selfDisableAcc,deleteReservation, putUserName, putUserPasswd, putUserPhoto, comparePassword } from '../redux/actions';
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';
import { useState } from 'react';
import image from "../assets/profile/uploadimage.png" 
import image2 from "../assets/profile/hamburguesa.png"
import image4 from "../assets/profile/padlock.png"


const regexPasswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
function validate(inputUser, inputPasswd, state1, state2){
    const errors = {}
    if(state1 === "validate1"){
        if(inputUser.name !== "" && inputUser.name.length < 5){
            errors.name = "El nombre de usuario debe tener al menos 5 caracteres"
        }
        if(inputUser.name !== "" && inputUser.name.length > 12){
            errors.name = "El nombre de usuario no debe superar los 12 caracteres"
        }
        if(inputUser.name.charAt(0) === " "){
            errors.name = "No se permiten espacios al inicio"
        }
        if(inputPasswd.password !== inputPasswd.repassword){
            errors.repassword = "Las contraseñas no coinciden"
        }
    }
    if(state2 === "validate2"){
        if(inputPasswd.password && !regexPasswd.test(inputPasswd.password)){
            errors.password = "La contraseña debe tener al menos 6 caracteres, una letra mayúscula y una letra minúscula"
          }
    }
    return errors
}

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // const users = useSelector((state) => state.users);

    // const findUser = (user) => {
    //     if(users.find((u) => u.user.toLowerCase() === user.toLowerCase())){
    //         return true
    //       } else {
    //         return false
    //       }
    //   }

    useEffect(() => {
        dispatch(getProfile())
        // dispatch(getUsers())
        dispatch(getReservations())
    }, [dispatch])
    
    const handleDelete =async (e,id)=>{
        e.preventDefault();
        swal({
            title: "Esta seguro que desea cancelar la reserva?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
        if(willDelete){
            dispatch(deleteReservation(id)).then(() => {
                dispatch(getProfile())
                swal({
                    title: "Reserva eliminada",
                    icon: "success",
                    button: "Aceptar",
                });
            })
        }
    })}
    
    const usuarioo = jwt_decode(localStorage.getItem('session'))
    const usuariooPhoto = localStorage.getItem('photo')
    const usuario = useSelector((state) => state.user)
    const [error, setError] = useState({});
    // console.log(usuario)
    
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
        });
        setError(validate({
            ...inputPasswd,
            [e.target.name] : e.target.value,
        },"validate1"))
    }
    // function changePasswd(e){
    //     e.preventDefault()
    //     if(inputPasswd.password === inputPasswd.repassword){
    //         dispatch(putUserPasswd(inputPasswd))
    //     } else {
    //         swal({
    //             title: "Las contraseñas no coinciden",
    //             text: "",
    //             icon: "error",
    //             button: "Aceptar",
    //         })
    //     }
    // }

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
        setError(validate({
            ...inputUser,
            [e.target.name] : e.target.value,
        },"validate1"))
    }
    // function changeName(e){
    //     e.preventDefault()
    //     dispatch(putUserName(inputUser))
    // }

    // CAMBIO DE IMAGEN
    const [photo, setPhoto] = useState("");
    // eslint-disable-next-line no-unused-vars
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
        //console.log(photo)
        const file = await res.json();
        setPhoto(file.secure_url);
        setLoading(false);
    };

    // function changePhoto(e){
    //     e.preventDefault()
    //     localStorage.setItem('photo', photo);
    //     dispatch(putUserPhoto({
    //         id: usuarioo.id,
    //         photo: photo 
    //     }))
    // }


    // ACTUALIZAR TODO DE UNA SOLA VEZ
    function saveAllChanges(e){
        e.preventDefault();
        const aux= validate(inputUser, inputPasswd, "validate1", "validate2")
        setError(aux);
        if(Object.keys(aux).length === 0){
            swal({
                title: "Escriba su contraseña",
                content: {
                  element: "input",
                  attributes: {
                    placeholder: "Escriba su contraseña",
                    type: "password",
                  },
                },
              }).then((resultado) => {
                var compareee = dispatch(comparePassword({
                    email: usuario.email,
                    password: resultado
                }))
                return compareee
                }).then((compareee) => {
            if(compareee.message === '¡Contraseña correcta!'){
                dispatch(putUserName({
                    id: usuarioo.id,
                    name: inputUser.name === "" ? usuario.user : inputUser.name
                }));
                dispatch(putUserPhoto({
                    id: usuarioo.id,
                    photo: photo === "" ? usuariooPhoto : photo
                }));
                photo !== "" && localStorage.setItem('photo', photo);
                if(inputPasswd.password !== ""){
                    dispatch(putUserPasswd(inputPasswd))
                }
                swal({
                    title: "Actualizaste tus datos correctamente",
                    text: "",
                    icon: "success",
                    button: "Aceptar",
                }).then(() => {
                    if(inputUser.name !== localStorage.getItem('name')) window.localStorage.setItem('name', inputUser.name);
                })
            } else {
                swal({
                    title: "Contraseña incorrecta",
                    text: "",
                    icon: "error",
                    button: "Aceptar",
                })
            }
            })
        } else {
            swal({
                title: "Completa los campos correctamente",
                text: "",
                icon: "error",
                button: "Aceptar",
            })
        }
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
    
    // CAMBIO PROFILE EDIT/NO EDIT
    const [editProf, setEditProf] = useState(false)
    const showEditProf = () => {
        setEditProf(!editProf);
    };
    
    // // MOSTRAR/OCULTAR CAMPOS PARA CAMBIO DE CONTRASEÑA
    // const [divPasswd, setDivPasswd] = useState(false)
    // const showDivPasswd = () => {
    //     setDivPasswd(!divPasswd);
    // };

    // MOSTRAR/OCULTAR BOTON DE DESHABILITAR CUENTA
    const [divDisableAcc, setDivDisableAcc] = useState(false)
    const showDivDisableAcc = () => {
        setDivDisableAcc(!divDisableAcc);
    };

    function banUser(e){
        e.preventDefault();
        swal({
            title: "¿Desea borrar su cuenta?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
            if(willDelete) {
                swal({
                    title: "Escriba su contraseña",
                    content: {
                    element: "input",
                    attributes: {
                        placeholder: "Escriba su contraseña",
                        type: "password",
                    },
                    },
                }).then((resultado) => {
                    var compareee = dispatch(comparePassword({
                        email: usuario.email,
                        password: resultado
                    }))
                    return compareee
                }).then((compareee) => {
                    if(compareee.message === '¡Contraseña correcta!'){
                        dispatch(selfDisableAcc({
                            erased : true
                    })).then(() =>{
                        swal({
                            title: "Tu cuenta ha sido borrada",
                            icon: "success",
                            button: "Aceptar",
                        });
                        localStorage.removeItem('session'); 
                        localStorage.removeItem('photo'); 
                        localStorage.removeItem('name')
                        navigate("/")
                    })
                    } else {
                        swal({
                            title: "Contraseña incorrecta",
                            text: "",
                            icon: "error",
                            button: "Aceptar",
                        })
                    }
                })
            }
        })
    }
       
    return (
        <div className="container mx-auto mt-48 h-full xl:mb-32 lg:mb-32 md:mb-24 sm:mb-1">
        <div>
            {
                !editProf ?
                <div className="bg-white relative shadow-2xl rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                <div className='flex justify-end mr-2'>
                    <button title='Editar perfil' className='bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full' onClick={showEditProf}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center">
                    <img src={usuariooPhoto} alt="" referrerPolicy='no-referrer' className="rounded-full mx-auto absolute -top-20 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                </div>
                <div className=" mt-16">
                <div className='flex flex-col justify-center items-center px-6 text-center'>
                    <h3 className='flex justify-center items-center font-bold border-b border-gray-500'><p className='text-center text-2xl placeholder-black w-40'>{usuario.user}</p>
                    </h3>
                    {error.name && (<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.name} </span>)}
                </div>

                <div className='flex justify-center items-center mt-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-center text-sm text-black font-medium ml-1"> {usuarioo.email}</p>
                </div>                    
                    <div className="w-full">
                        <h3 className="font-medium text-gray-900 text-left px-6">Reservas</h3>
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
                                        <div className="w-full border-t rounded-[15px] border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-300 transition duration-150">
                                        <img src={image2} alt="" className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                        <span className='max-w-xs'>Reserva el día {fecha} a las {el.hour.slice(0,5)} en la mesa {el.tables[0].num_Table}</span>
                                        <button onClick={(e)=>handleDelete(e,el.id)} className='bg-red-700 hover:bg-red-900 text-white rounded-full max-w-sm max-h-6 px-2 ml-2'>Cancelar</button>
                                        </div>
                                    </li>
                                    </ul>
                                    
                                )
                            })
                            : <div className="w-full border-t rounded-[15px] border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-300 transition duration-150">
                            <img src={image2} alt="" className="rounded-full h-6 inline-block mr-2"/>
                            <span>No tienes reservas</span>
                            </div>
                        } 
                    </div>
                </div>
            </div> :
            // ACA CAMBIA DE COMPONENTE
            <div className="bg-white relative shadow-2xl rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                <div className='flex justify-end mr-2'>
                    <button title='Volver al perfil' className='bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full' onClick={showEditProf}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center">
                    {
                        !photo ?
                        <img src={usuariooPhoto} alt="" referrerPolicy='no-referrer' className="rounded-full mx-auto absolute -top-20 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                        : <img src={photo} alt="" referrerPolicy='no-referrer' className="rounded-full mx-auto absolute -top-20 w-40 h-40 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                    }
                </div>
                <div className='flex justify-center mt-6'>
                    <div className='flex items-center justify-end w-56'>
                    <label className="">
                    <img src={image} alt="" title='Añadir imagen' className='cursor-pointer mr-2'/>
                    <input name="photo" type="file" onChange={uploadImage} className="sr-only"/>
                    </label>
                    </div>
                </div>
                
                <div className=" mt-3">
                <div className='flex flex-col justify-center items-center px-6 text-center'>
                    <h3 className='flex justify-center items-center font-bold border-b border-teal-500'><input className='text-center text-2xl placeholder-black w-40' name="name" value={inputUser.name} type="text" placeholder={usuario.user} onChange={(e)=> handleChangeName(e)}/> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="stroke-gray-500 w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                    </h3>
                    {error.name && (<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.name} </span>)}
                </div>

                <div className='flex justify-center items-center mt-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-center text-sm text-black font-medium ml-1"> {usuarioo.email}</p>
                </div>
                
                <div className='flex flex-col justify-center items-center'>                
                    <div className='flex flex-col my-1 mx-5'>
                        <div className='flex flex-col justify-center items-center'>
                        <h3 className='flex justify-center items-center font-bold max-w-fit'>
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
                        {error.password && <span className="flex text-center items-center font-medium tracking-wide text-red-500 text-xs ml-1 w-48"> {error.password} </span>}
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                        <h3 className='flex justify-center items-center font-bold max-w-fit mt-1'>
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
                        {error.repassword && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1"> {error.repassword} </span>}
                        </div>
                    </div>
                </div>
                

                <div className='flex justify-center mt-2'>
                    <button disabled={inputPasswd.password === "" && inputUser.name === "" && photo === ""} className='font-bold text-1xl bg-red-700 enabled:hover:bg-red-900 text-white px-2 h-6 rounded-full'  onClick={(e) => saveAllChanges(e)}>Guardar cambios
                    </button>
                </div>
                    <div className='flex justify-end pb-1 pr-1'>
                        <div className='flex flex-col items-center'>
                        <button className='mt-2 font-normal text-xs bg-gray-200 enabled:hover:bg-gray-300 text-black px-1 rounded-lg' type='button' onClick={showDivDisableAcc}>Borrar cuenta&#129055;</button>
                        <div>
                            {
                                !divDisableAcc ?
                                <span></span>:
                                <button className='font-bold text-1xl bg-red-700 enabled:hover:bg-red-900 text-white px-2 h-6 rounded-full' onClick={(e) => banUser(e)}>Borrar</button>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
    )
}

export default Profile;