
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })



    const handleChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...user, [name]: value };
        setUser(newDatos);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            console.log('no enviar');
        } else {
            let res = await axios.post("http://localhost:3001/login", user);
            console.log(res.data);
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            <h1 className="text-center text-3xl sm:text-5x1 md:text-7x1 font-['Cabin_Sketch'] pb-5">Login</h1>
            <form onSubmit={handleSubmit} noValidate={true} autoComplete="off">
                <div>
                    <label htmlFor="email">Usuario</label>
                    <input
                        id="email"
                        type="text"
                        onChange={handleChange}
                        value={user.email}
                        name="email"
                        required autoFocus
                    />
                </div>
                <div >
                    <div >
                        <label htmlFor="password">Contraseña</label>
                        <a href="/">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        onChange={handleChange}
                        value={user.password}
                        className="form-control"
                        name="password"
                        required
                    />
                </div>
                <div >
                    <div >
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                        />
                        <label htmlFor="remember">Recordarme</label>
                    </div>
                    <button type="submit">
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;