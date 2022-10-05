import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getReservations, deleteReservation} from '../redux/actions'
import swal from 'sweetalert';


const MannageReservations = () => {

    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reservations);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getReservations());
        setReload(false);
    }, [dispatch, reload]);



    const handleDelete = (id) => {
        swal({
            title: "Esta seguro de eliminar la reserva?",
            text: "Una vez eliminada no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
        dispatch(deleteReservation(id)).then(() => {
            setReload(true)
            swal({
                title: "Reserva eliminada",
                text: "La reserva ha sido eliminada",
                icon: "success",
                button: "Aceptar",
                });
            });
        }
    });
    }

    return (
            <div className="text-gray-900 bg-gray-200 min-h-screen overflow-x-auto">
        <div className="p-4 flex">
            <h1 className="text-3xl">
                Reservaciones
            </h1>
        </div>
            {
                reservations.length > 0 ? 
            <div className="px-3 py-2 flex justify-center">
            <table className="text-md bg-white shadow-md rounded mb-4 hidden md:table w-full">
                <tbody>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Foto</th>
                        <th className="text-left p-3 px-5">Usuario</th>
                        <th className="text-left p-3 px-5">Correo</th>
                        <th className="text-left p-3 px-5">Fecha</th>
                        <th className="text-left p-3 px-5">Hora</th>
                        <th className="text-left p-3 px-5">Mesa N°</th>
                        <th className="text-left p-3 px-5">Sillas</th>
                        <th className="text-left p-3 px-5">Acciones</th>
                        
                    </tr>
                    {
                        reservations?.map((reservation) => (
                            <tr className="border-b hover:bg-orange-100 bg-gray-100" key={reservation.id}>
                                <td className="p-3 px-5">
                                    {console.log(reservation)}
                                    <img className="w-10 h-10 rounded-full object-cover" src={reservation.users[0]?.photo} alt="" />
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.users[0]?.user}
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.users[0]?.email}
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.date.slice(0,10)}
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.hour}
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.tables[0]?.num_Table}
                                </td>
                                <td className="p-3 px-5">
                                    {reservation.tables[0]?.chairs}
                                </td>
                                <td className="p-3 px-5">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(reservation.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div> : <div className="bg-white shadow-md rounded-lg p-4 mb-2">
                            <div className="flex items-center space-x-3">
                                <div className="text-gray-700">
                                    <p className="font-semibold">No Hay Reservaciones</p>
                                </div>
                            </div>
                        </div>
            
            }
        <div className="grid grid-cols-1 gap-4 md:hidden">
                    {
                        reservations?.map((r) => {
                            return(
                                <div className="bg-white shadow-md rounded-lg p-4 mb-2" key={r.id}>
                                    
                                    <div className="flex items-center space-x-3">
                                        <img className="h-8 w-8 rounded-full object-cover " src={r.users[0]?.photo} alt="" />
                                        <div className="text-gray-700">
                                            <p className="font-semibold">{r.users[0]?.user}</p>
                                        </div>
                                        <div className="text-gray-700">
                                            <p className="font-semibold">{r.date.slice(0,10)}</p>
                                            <p className="text-sm">Hora: {r.hour.slice(0,5)}</p>
                                        </div>
                                        <div className="text-gray-700">
                                            <p className="font-semibold">Mesa {r.tables[0]?.num_Table}</p>
                                            <p className="text-sm">{r.tables[0]?.chairs} sillas</p>
                                        </div>
                                        <div className="flex justify-end">
                                        {
                                            <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(r.id)}>Eliminar</button>
                                        }
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
        )
    }

export default MannageReservations;