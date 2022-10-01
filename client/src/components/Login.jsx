import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginGoogle, login, loginFacebook } from "../redux/actions";
import { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import swal from "sweetalert";
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientIdGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE;
  const clientIdFacebook = process.env.REACT_APP_CLIENT_ID_FACEBOOK;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    const initClient = () => {
      gapi.client.init({ clientIdGoogle: clientIdGoogle, scope: '' });
    };
    gapi.load('client:auth2', initClient);
  });


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
          window.localStorage.setItem('session', data.session);
          window.localStorage.setItem('photo', data.photo);
          window.localStorage.setItem('name', data.name);
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

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const userGoogle = {
      user: result.name,
      email: result.email,
      photo: result.imageUrl,
      googleId: result.googleId,
    }
    let data = await dispatch(loginGoogle(userGoogle));

    // console.log(data)
    window.localStorage.setItem('session', data.data.session);
    window.localStorage.setItem('photo', data.data.photo);
    window.localStorage.setItem('name', data.data.name);

    navigate('/');
  };

  const googleFailure = (err) => {

    console.log('error inicio, ', err)
    swal({
      title: "Fallo inicio de sesión con google, intenta más tarde!",
      icon: "warning",
      button: "Aceptar",
    });
  };

  
  const responseFacebook = () => {
    if(!window.FB)return;
    window.FB.getLoginStatus(res =>{
      // console.log(res)
      if(res.status === 'connected'){
        loginhandlerfacebook(res)
      }else{
        window.FB.login(loginhandlerfacebook,{scope:'public_profile,email'})
      }
    })
  };

  const loginhandlerfacebook = (res) =>{
    if(res.status === 'connected'){
      window.FB.api('/me?fields=id,name,email,picture', async (userdata) =>{
        // console.log(userdata)
        const userFacebook = {
          user: userdata.name,
          email: userdata.email,
          photo: userdata.picture.data.url,
          facebookId: userdata.id,
        }
        let data = await dispatch(loginFacebook(userFacebook));
        // console.log(data)
        // console.log(data)
        window.localStorage.setItem('session', data.data.session);
        window.localStorage.setItem('photo', data.data.photo);
        window.localStorage.setItem('name', data.data.name);
    
        navigate('/');
      })
  }
}


  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


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
                  <div className="flex justify-end items-center relative">
                    <input
                      name="password"
                      value={user.password}
                      type={passwordShown ? "text" : "password"}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => handleChange(e)}
                    />
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
                <br /><br />
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sing in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <GoogleLogin
                    clientId={clientIdGoogle}
                    render={(renderPros) => (
                      <button
                        onClick={renderPros.onClick}
                        disabled={renderPros.disabled}
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
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                  {/* <FacebookLogin
                    appId={clientIdFacebook}
                    fields="name,email,picture,id"
                    callback={responseFacebook} 
                    render={(props) => (
                      <button 
                      onClick={props.onClick}
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                      />
                      Facebook{" "}
                    </button>
                  )}
                    /> */}
                </div>
              </form>
              <div className="w-full md:w-12/12 px-4 mx-auto text-center">
                <Link to="/forgotPassword">Olvidaste tu contraseña?</Link>
              </div>
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
