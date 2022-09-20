import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import  ProfileImages from "../assets/register/ProfileImages.js"

function validate(input, findedUser="", findedEmail="",photo, state1, state2){
    const errors = {}
    if(state1 === "validate1"){
        if(findedUser === true){
            errors.user = "El nombre de usuario ya existe"
        }
        if(input.user.length < 5){
            errors.user = "El nombre de usuario debe tener al menos 5 caracteres"
        }
        if(input.user.length > 12){
            errors.user = "El nombre de usuario no debe superar los 12 caracteres"
        }
        if(input.user.charAt(0) === " ")
            errors.user = "No se permiten espacios al inicio"
    }
    if(state2 === "validate2"){
        if(!input.user){
            errors.user = "Se requiere un nombre de usuario"
        }
        if(input.password.length < 6){
            errors.password = "La contraseña debe tener al menos 6 caracteres"
        }
        if(!input.password){
            errors.password = "Se requiere contraseña"
        }
        if(!input.email){
            errors.email = "Se requiere email"
        }
        if(!photo){
            errors.photo = "Se requiere una foto"
        }
        if(findedEmail === true){
            errors.email = "El email ya esta registrado"
        }
    }
    return errors
}

export default function RegisterUser(){
const dispatch = useDispatch();
const navigate = useNavigate();

const userss = useSelector((state) => state.users);

const findUser = (user) => {
    if(userss.find((u) => u.user.toLowerCase() === user.toLowerCase())){
        return true
      } else {
        return false
      }
  }

const findEmail = (email) => {
    if(userss.find((u) => u.email.toLowerCase() === email.toLowerCase())){
        return true
      } else {
        return false
      }
}


const [error, setError] = useState({});
const [loading, setLoading] = useState(true);
const [photo, setPhoto] = useState("");
const [input, setInput] = useState({
    user: "",
    password: "",
    email: "",
    photo: "",
    admin: false,
});


function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    });
    let findedUser = findUser(input.user)
    let findedEmail = findEmail(input.email)
    setError(validate({
        ...input,
        [e.target.name] : e.target.value,
    }, findedUser,findedEmail , photo, "validate1"))
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

function handleSubmit(e){
    e.preventDefault();
    let findedUser = findUser(input.user)
    let findedEmail = findEmail(input.email)
    const aux = validate(input, findedUser, findedEmail, photo, "validate1", "validate2")
    setError(aux);
    console.log(input);
    if(Object.keys(aux).length === 0){
        dispatch(createUser({...input, photo: photo}));
        alert("Felicidades, te has registrado exitosamente!");
        navigate("/login")
    } else {
        alert("Complete correctamente todos los campos")
    }
};

useEffect(() => {
    autoUpload()
    dispatch(getUsers())
}, [])

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
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contraseña</label><input name="password" value={input.password} type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Contraseña" onChange={(e)=> handleChange(e)}/>
            {error.password && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.password} </span>}
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">E-mail</label><input name="email" value={input.email} type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="E-mail" onChange={(e)=> handleChange(e)}/>
            {error.email && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.email} </span>}
          </div>
          <div>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Imagen de perfil</label>
                {
                    photo ? <img src={photo} alt= "Profile image" className="w-50 h-50 rounded-full"/> : 
                    <img src={image.url} alt= "Profile image" className="w-50 h-50 rounded-full"/>
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
        <div className="text-center">O registrate con:</div>
        <div className="btn-wrapper text-center">
          <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
            <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"/>Github</button>
          <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button" >
            <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>Google </button>

        </div>
      </div>
    </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-2">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
            </div>
          </div>
        </div>
      </footer>
    </section>

</div>
    );
}