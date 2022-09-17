import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterUser(){
const dispatch = useDispatch();
const navigate = useNavigate();

const userss = useSelector((state) => state.users);

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
    })
    console.log(input)
};

function handleSubmit(e){
    e.preventDefault();
    console.log(input);
    dispatch(createUser(input));
    alert("Felicidades, te has registrado exitosamente!");
    setInput({
        user: "",
        password: "",
        email: "",
        photo: "",
        admin: false,
    })
    navigate("/")
};

    return (
        <div className="flex flex-col items-center mt-20">
            <h1>Register</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre de Usuario: </label>
                        <input type="text" value={input.user} name="user"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Contraseña: </label>
                        <input type="password" value={input.password} name="password"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>E-Mail: </label>
                        <input type="email" 
                        value={input.email}
                        name="email"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input type="text" 
                        value={input.photo}
                        name="photo"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <button type="submit"
                        disabled={!input.user || !input.password || !input.email || !input.photo}>Registrarte</button>
                    </div>
                </form>
            </div>
        </div>
    );
}