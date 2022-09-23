import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, loginWithFacebook } from "../redux/actions";
import { useEffect } from "react";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // useEffect(()=>{
  //   const loggedUser = window.localStorage.getItem('user')
  //   if(loggedUser){
  //     const localUser = JSON.parse(loggedUser)
  //     setUser(localUser)
  //   }
  // },[])

  const handleChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...user, [name]: value };
    setUser(newDatos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      console.log("no enviar");
    } else {
      let data = await dispatch(login(user));
      if (data) {
        if (data.hasOwnProperty("message")) {
          swal({
            title: data.message,
            icon: "warning",
            button: "Aceptar",
          });
        } else {
          window.localStorage.setItem("user", data);
          navigate("/");
        }
        
      } else {
        swal({
          title: "Usuario o contraseña incorrectos",
          icon: "warning",
          button: "Aceptar",
        });
      }
    }
  };

  const handleGoogle = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  // const handleFacebook = ()=>{
  //   window.open('http://localhost:3001/auth/facebook','_self');
  // }

  return (
    <div className="mt-11">
      <section className="bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Sign in with your credentials</small>
              </div>
              <form>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    value={user.email}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    value={user.password}
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Remember me
                    </span>
                  </label>
                </div>
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sing in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                    />
                    Facebook
                  </button>
                  <button
                    onClick={handleGoogle}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                    />
                    Google{" "}
                  </button>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 text-black"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {" "}
                    Sign In{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-2">
          <div className="container mx-auto px-2">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <Link to="/register">No tienes cuenta?</Link>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Login;
