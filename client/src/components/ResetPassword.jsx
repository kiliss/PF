import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { resetPassword } from '../redux/actions';
import swal from 'sweetalert';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPassword(e.target.value);
      };
      const handleChange2 = (e) => {
        setPassword2(e.target.value);
      };

      const handleSubmit =  (e) => {
        e.preventDefault();
        if(password === password2){
            let data = dispatch(resetPassword(password));
            swal({
                title: data.message,
                icon: "warning",
                button: "Aceptar",
              });
              Navigate('/login');
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
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                New password
                            </label>
                            <input
                                name="password"
                                value={password}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="password"
                                onChange={(e) => handleChange(e)}
                            />
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Confirmed password
                            </label>
                            <input
                                name="password2"
                                value={password2}
                                type="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="confirmed password"
                                onChange={(e) => handleChange2(e)}
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

export default ResetPassword;
