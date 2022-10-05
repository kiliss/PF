import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getUsers, editUser} from "../redux/actions";
import swal from "sweetalert";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    // const [charge, setCharge] = useState(false)
    useEffect(() => {
        // setCharge(false)
        dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleAdmin(e, user) {
        e.preventDefault();
        swal({
            title: "¿Desea cambiar el rol del usuario?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
        dispatch(editUser({
            id : user.id,
            admin : !user.admin,
            erased: user.erased
        })).then(() => {
        // setCharge(true)
        swal({
            title: "Rol cambiado",
            icon: "success",
            button: "Aceptar",
        });
        dispatch(getUsers());
            }
        )}
        });
    }
    function banUser(e, user) {
        e.preventDefault();
        if(!user.erased){
        swal({
            title: "¿Desea borrar al usuario?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
        dispatch(editUser({
            id : user.id,
            admin : user.admin,
            erased : !user.erased
        })).then(() => {
        // setCharge(true)
        swal({
            title: "Usuario Borrado",
            icon: "success",
            button: "Aceptar",
        });
        dispatch(getUsers());
            }
        )}
        });
    }}




    return (
        <div className="text-gray-900 bg-gray-200 min-h-screen overflow-x-auto">
    <div className="p-4 flex">
        <h1 className="text-3xl">
            Users
        </h1>
    </div>
    <div className="px-3 py-2 flex justify-center">
        <table className="text-md bg-white shadow-md rounded mb-4 hidden md:table w-full">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Foto</th>
                    <th className="text-left p-3 px-5">Nombre</th>
                    <th className="text-left p-3 px-5">Correo</th>
                    <th className="text-left p-3 px-5">Rol</th>
                    <th className="text-left p-3 px-5">Estado</th>
                    
                </tr>
                {
                    users?.map((user) => (
                        !user.erased ?
                        <tr className="border-b hover:bg-orange-100 bg-gray-100" key= {user.id}>
                            <td className="p-3 px-5"><img className="h-8 w-8 rounded-full object-cover " src={user.photo} alt= {user.user} /></td>
                            <td className="p-3 px-5">{user.user}</td>
                            <td className="p-3 px-5">{user.email}</td>
                            <td className="p-3 px-5">
                                {
                                    user.admin  ? (
                                        <button onClick={(e) => handleAdmin(e, user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                            Admin</button>
                                    ) : (
                                        <button onClick={(e) => handleAdmin(e, user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                            Usuario</button>
                                    )

                                }
                            </td>
                            <td className="p-3 px-5">
                                <button onClick={(e) => banUser(e, user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Borrar</button>
                            </td>
                        </tr> : null
                    ))
                }
            </tbody>
        </table>
    </div>
    <div className="grid grid-cols-1 gap-4 md:hidden">
                {
                    users?.map((user) => {
                        return !user.erased ? (
                            <div className="bg-white shadow-md rounded-lg p-4 mb-2" key={user.id}>
                                <div className="flex items-center space-x-3">
                                    <img className="h-8 w-8 rounded-full object-cover " src={user.photo} alt={user.user} />
                                    <div className="text-gray-700">
                                        <p className="font-semibold">{user.user}</p>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-around">
                                    {
                                        user.admin ? (
                                            <button onClick={(e) => handleAdmin(e, user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                                Admin</button>
                                        ) : (
                                            <button onClick={(e) => handleAdmin(e, user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Usuario</button>
                                        )
                                    }
                                    {
                                        <button onClick={(e) => banUser(e, user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Borrar</button>
                                    }
                                </div>
                            </div>
                        ) : null
                    })
                }
            </div>
    </div>
    )
}

export default Users
