import React, { useState } from 'react';
import axios from 'axios';
import style from "./style/Login.module.css";
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [user, setUser] = useState({
        username: '',
        password: ''
    })


    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const handleGoogle = () =>{
        window.open('http://localhost:3000/auth/google','_self')
    }

    return (
        <div className={style.container}>
            <form>
                <h1>Login</h1>
                <div >
                    <label>Username: </label>
                    <input
                        name='user'
                        type='text'
                        placeholder='Username'
                        onChange={handleChange}
                    />
                </div>

                <div >
                    <label>Password: </label>
                    <input
                        name='password'
                        type='password' id="password"
                        placeholder='******'
                        onChange={handleChange}
                    />
                </div>
                <div >
                    <button >Login</button>
                </div>
                <a href='#!'>
                    Forgot Password
                </a>

            </form>

            <label>Don't have an Account</label>
            <Link to='/'>
                <button>Register</button>
            </Link>
            <div >
                    <button onClick={handleGoogle}>Google</button>
            </div>
        </div>
    )
}

export default Login;