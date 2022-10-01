import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { recuperarContra } from '../redux/actions';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


      const handleSubmit = async (e) => {
        e.preventDefault();
         dispatch(recuperarContra(email))
        .then((data)=>swal({title: data.data.message, icon: "warning",button: "Aceptar"}))
         .then(()=>navigate('/login'))
      };

    return (
        <div className="mt-11">
        <section className="bg-blueGray-50">
          <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
                        <small>Forgot Password</small>
                    </div>
                    <form>
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                value={email}
                                type="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
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

export default ForgotPassword;


