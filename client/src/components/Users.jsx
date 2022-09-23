import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getUsers, editUser} from "../redux/actions";
import swal from "sweetalert";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [charge, setCharge] = useState(false)
    useEffect(() => {
        setCharge(false)
        dispatch(getUsers());
    }, [dispatch, charge]);


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
            admin : !user.admin
        }));
        dispatch(getUsers());
        setCharge(true)
        swal({
            title: "Rol cambiado",
            icon: "success",
            button: "Aceptar",
        });
            }
        });
    }




    return (
        <div className="text-gray-900 bg-gray-200 min-h-screen">
    <div className="p-4 flex">
        <h1 className="text-3xl">
            Users
        </h1>
    </div>
    <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Foto</th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Email</th>
                    <th className="text-left p-3 px-5">Role</th>
                    
                </tr>
                {
                    users?.map((user) => (
                        <tr className="border-b hover:bg-orange-100 bg-gray-100" key= {user.id}>
                            <td className="p-3 px-5"><img className="h-8 w-8 rounded-full object-cover " src={user.photo} alt= {user.user} /></td>
                            <td className="p-3 px-5">{user.user}</td>
                            <td className="p-3 px-5">{user.email}</td>
                            <td className="p-3 px-5">
                                {
                                    user.admin ? (
                                        <button onClick={(e) => handleAdmin(e, user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                            Admin</button>
                                    ) : (
                                        <button onClick={(e) => handleAdmin(e, user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                            User</button>
                                    )

                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
</div>
    )
}


{/* <img
className="h-8 w-8 rounded-full object-cover "
src="https://randomuser.me/api/portraits/men/30.jpg"
alt=""
/> */}
export default Users
