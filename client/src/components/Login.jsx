import React from 'react';
import axios from 'axios';
import style from "./style/Login.module.css";

const Login = () => {
    return (
        <div className={style.container}>
            <form>
                <h1>Login</h1>
                <div className={"stilos"}>
                    <label>Email: </label>
                    <input
                        name='email'
                        type="email"
                        placeholder='email@gmail.com'
                    />
                </div>

                <div className={"stilos"}>
                    <label>Password: </label>
                    <input
                        name='password'
                        type='password' id="password"
                        placeholder='******'
                    />
                </div>
                <div className={"stilos"}>
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
        </div>
    )
}

export default Login;