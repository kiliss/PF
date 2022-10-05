/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, emailExist } from "../redux/actions";
import { useDispatch } from "react-redux";
import  ProfileImages from "../assets/register/ProfileImages.js"
import swal from 'sweetalert';

const regexPasswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

function validate(input, findedEmail="",photo, state1, state2){
    const errors = {}
    if(state1 === "validate1"){
        if(input.user.length < 5){
            errors.user = "El nombre de usuario debe tener al menos 5 caracteres"
        }
        if(input.user.length > 12){
            errors.user = "El nombre de usuario no debe superar los 12 caracteres"
        }
        if(input.user.charAt(0) === " "){
            errors.user = "No se permiten espacios al inicio"
        }
        if(findedEmail.message === "Existe"){
            errors.email = "El email ya esta registrado"
        }
        if(input.password !== input.repassword){
          errors.repassword = "Las contraseñas no coinciden"
        }
    }
    if(state2 === "validate2"){
        if(!input.user){
            errors.user = "Se requiere un nombre de usuario"
        }
        if(!input.password){
            errors.password = "Se requiere contraseña"
        }
        if(input.password && !regexPasswd.test(input.password)){
          errors.password = "La contraseña debe tener al menos 6 caracteres, un una letra mayúscula y una letra minúscula"
        }
        if(!input.email){
          errors.email = "Se requiere email"
        }
        if(input.email && !regexEmail.test(input.email)){
          errors.email = "Email invalido"
        }
        if(!photo){
            errors.photo = "Se requiere una foto"
        }
    }
    return errors
}

export default function RegisterUser(){
const dispatch = useDispatch();
const navigate = useNavigate();

const [error, setError] = useState({});
const [loading, setLoading] = useState(true);
const [photo, setPhoto] = useState("");
const [input, setInput] = useState({
    user: "",
    password: "",
    repassword: "",
    email: "",
    photo: "",
    admin: false,
});

const handleChange = async (e) =>{
    setInput({
        ...input,
        [e.target.name] : e.target.value
    });
    let findedEmail = await dispatch(emailExist(input.email))
    //console.log(findedEmail)
    setError(validate({
        ...input,
        [e.target.name] : e.target.value,
    },findedEmail , photo, "validate1"))
};

const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Foodss");
    setLoading(true);
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzvqedesg/image/upload", {
            method: "POST",
            body: data
        }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setLoading(false);
}

const image = ProfileImages[Math.floor(Math.random() * 9)]

function autoUpload(){
    setPhoto(image.url)
}

const handleSubmit = async (e) => {
    e.preventDefault();
    let findedEmail = await dispatch(emailExist(input.email))
    const aux = validate(input, findedEmail, photo, "validate1", "validate2")
    setError(aux);
    if(Object.keys(aux).length === 0){
        dispatch(createUser({...input, photo: photo}));
        swal({
            title: "Felicidades!",
            text: "Te has registrado exitosamente!",
            icon: "success",
            button: "Aceptar",
        })
        navigate("/login")
    } else {
        swal({
            title: "Error!",
            text: "Complete correctamente todos los campos",
            icon: "error",
            button: "Aceptar",
        })
    }
};

useEffect(() => {
    autoUpload()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const [passwordShown, setPasswordShown] = useState(false);
const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePassword = () => {
      setRePasswordShown(!rePasswordShown);
    };

    return (
    <div className="mt-11">
            <section className="bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="text-blueGray-400 text-center mb-3 font-bold">
          <h1 className="text-2xl">Registrate</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Nombre de usuario</label><input name="user" value={input.user} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Nombre de usuario" onChange={(e)=> handleChange(e)}/>
            {error.user && (<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.user} </span>)}
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contraseña</label>
            <div className="flex justify-end items-center relative">
            <input name="password" value={input.password} type={passwordShown ? "text" : "password"} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Contraseña" onChange={(e)=> handleChange(e)}/>
            <button className="absolute px-1" type="button" onClick={togglePassword}>{passwordShown === false ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg> 
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>}
            </button>
            </div>
            {error.password && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.password} </span>}
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Repetir contraseña</label>
            <div className="flex justify-end items-center relative">
            <input name="repassword" value={input.repassword} type={rePasswordShown ? "text" : "password"} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Contraseña" onChange={(e)=> handleChange(e)}/>
            <button className="absolute px-1" type="button" onClick={toggleRePassword}>{rePasswordShown === false ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg> 
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>}
            </button>
            </div>
            {error.repassword && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.repassword} </span>}
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Correo</label><input name="email" value={input.email} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Correo" onChange={(e)=> handleChange(e)}/>
            {error.email && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.email} </span>}
          </div>
          <div>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Imagen de perfil</label>
                {
                    photo ? <img src={photo} alt= "Profile" className="w-50 h-50 rounded-full"/> : 
                    <img src={image.url} alt= "Profile" className="w-50 h-50 rounded-full"/>
                }                    
            </div>
            <div>
                <label className="block uppercase text-blueGray-600 text-xs font-semibold mb-2">Agregar tu propia imagen</label>
                <input
                type="file" 
                value={input.photo}
                name="photo"
                onChange={uploadImage}/>
            </div>
          <div className="text-center mt-6">
            <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 text-black" type="submit"> Registrate </button>
          </div>
        </form>
        {/* <div className="text-center">O registrate con:</div>
        <div className="btn-wrapper text-center">
          <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
            <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"/>Github</button>
          <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button" >
            <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>Google </button>

        </div> */}
      </div>
    </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-2">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <Link to="/login">¿Ya tienes cuenta?</Link>
            </div>
          </div>
        </div>
      </footer>
    </section>

</div>
    );
}