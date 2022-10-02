import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../redux/actions';
import swal from 'sweetalert';

const ResetPassword = () => {

  const regexPasswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    id,
    token,
    password: '',
    repassword: '',
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...user, [name]: value };
    setUser(newDatos);
  };

  const [passwordShown, setPasswordShown] = useState(false);
const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePassword = () => {
      setRePasswordShown(!rePasswordShown);
    };



  function validate(inputPasswd, state1, state2) {
    const errors = {}
    if (state1 === "validate1") {
      if (inputPasswd.password !== inputPasswd.repassword) {
        errors.repassword = "Las contraseñas no coinciden"
      }
    }
    if (state2 === "validate2") {
      if (inputPasswd.password && !regexPasswd.test(inputPasswd.password)) {
        errors.password = "La contraseña debe tener al menos 6 caracteres, una letra mayúscula y una letra minúscula"
      }
    }
    return errors
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password) {
      const aux = validate(user, "validate1", "validate2")
    setError(aux);
    if(Object.keys(aux).length === 0){
      dispatch(resetPassword(user))
        .then((data) => swal({ title: data.data.message, icon: "warning", button: "Aceptar", }))
        .then(() => navigate('/login'));
    } else {
      swal({ title: 'Algo salió mal!', icon: "warning", button: "Aceptar", })
    }
  }else{
    swal({ title: 'Faltan datos!', icon: "warning", button: "Aceptar", })
  }
  };

  return (
    <div className="mt-11">
      <section className="bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              <small>Reset Password</small>
            </div>
            <form>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Nueva Contraseña</label>
                <div className="flex justify-end items-center relative">
                  <input name="password" value={user.password} type={passwordShown ? "text" : "password"} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Contraseña" onChange={(e) => handleChange(e)} />
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
                  <input name="repassword" value={user.repassword} type={rePasswordShown ? "text" : "password"} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Contraseña" onChange={(e) => handleChange(e)} />
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

              <div className="text-center mt-6">
                <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 text-black"
                  type="button"
                  onClick={handleSubmit}
                >
                  {" "}
                  Enviar{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResetPassword;
