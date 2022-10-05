import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getTable, deleteTable, editTable, createTable} from '../redux/actions'
import swal from 'sweetalert';


const MannageTables = () => {

    const dispatch = useDispatch();
    const tables = useSelector(state => state.tables);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getTable());
        setReload(false);
    }, [dispatch, reload]);


    const handleDelete = (table) => {
        if(table.reservations.length > 0){
            swal({
                title: "Error",
                text: "No se puede eliminar una mesa con reservas",
                icon: "error",
                button: "Aceptar",
            });
        } else {
        swal({
            title: "Esta seguro de eliminar la Mesa?",
            text: "Una vez eliminada no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
        dispatch(deleteTable(table.id)).then(() => {
            setReload(true)
            swal({
                title: "Mesa eliminada",
                text: "La Mesa ha sido eliminada",
                icon: "success",
                button: "Aceptar",
                });
            });
        }
    });
    }
    }
    const editTables = (table) => {
        swal({
            title: "Editar Mesa",
            text: "Desea editar el estado de la mesa?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willEdit) => {
            if (willEdit) {
                //console.log(table)
                dispatch(editTable({
                    id: table.id,
                    state: !table.state,
                    num_Table: table.num_Table,
                    chairs: table.chairs
                })).then(() => {
                    setReload(true)
                    swal({
                        title: "Mesa editada",
                        text: "La Mesa ha sido editada",
                        icon: "success",
                        button: "Aceptar",
                    });
                });
            }
        });
       
    }

    const editNumeroChairs = (table) => {
        swal({
            title: "Escriba el numero de sillas que desea",
            content: {
            element: "input",
            attributes: {
                placeholder: "Numero de sillas",
                },
            },
        }).then((r) => {
            if (isNaN(r)) {
                swal({
                    title: "Error",
                    text: "Debe ingresar un numero",
                    icon: "error",
                    button: "Aceptar",
                });
            } else {
                if(r < 1 || r > 10){
                    swal({
                        title: "Error",
                        text: "El numero de sillas debe ser entre 1 y 10",
                        icon: "error",
                        button: "Aceptar",
                    });
                } else {
                dispatch(editTable({
                    id: table.id,
                    state: table.state,
                    num_Table: table.num_Table,
                    chairs: r
                })).then(() => {
                    setReload(true)
                    swal({
                        title: "Mesa editada",
                        text: "La Mesa ha sido editada",
                        icon: "success",
                        button: "Aceptar",
                    });
                });
            }} 
        })
    }
    const createTables = () => {
        swal({
            title: "Escriba el numero de la mesa que desea",
            content: {
            element: "input",
            attributes: {
                placeholder: "Numero de mesa",
                },
            },
        }).then((r) => {
            if (isNaN(r)) {
                swal({
                    title: "Error",
                    text: "Debe ingresar un numero",
                    icon: "error",
                    button: "Aceptar",
                });
            } else {
                if(r < 1 || r > 20){
                    swal({
                        title: "Error",
                        text: "El numero de mesa debe ser entre 1 y 20",
                        icon: "error",
                        button: "Aceptar",
                    });
                } else {
                dispatch(createTable({
                    state: false,
                    num_Table: r,
                    chairs: 1
                }))
                .then((a) => {
                    if(a === "La mesa ya existe"){
                        swal({
                            title: "Error",
                            text: "La mesa ya existe",
                            icon: "error",
                            button: "Aceptar",
                        });
                    } else {
                    setReload(true)
                    swal({
                        title: "Mesa creada",
                        text: "La Mesa ha sido creada",
                        icon: "success",
                        button: "Aceptar",
                    });
                }
                });
            }}
        
        })
   
    }
    //console.log(tables)

    return (
            <div className="text-gray-900 bg-gray-200 min-h-screen overflow-x-auto">
        <div className="p-4 flex">
            <h1 className="text-3xl">
                Mesas
            </h1>
        </div>
            {
                tables.length > 0 ? 
            <div className="px-3 py-2 flex justify-center">
            <table className="text-md bg-white shadow-md rounded mb-4 hidden md:table w-full">
                <tbody>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">N° Mesa</th>
                        <th className="text-left p-3 px-5">Sillas</th>
                        <th className="text-left p-3 px-5">Estado</th>
                        <th className="text-left p-3 px-5">
                            {<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={createTables}>Crear Mesa</button>}
                        </th>
                    </tr>
                    {
                        tables?.map((table) => (
                            <tr className="border-b hover:bg-orange-100 bg-gray-100" key={table.id}>
                                <td className="p-3 px-5">
                                    {table.num_Table}
                                </td>
                                <td className="p-3 px-5">
                                    {
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => editNumeroChairs(table)}>{table.chairs}</button>
                                    }
                                </td>
                                <td className="p-3 px-5">
                                    {
                                        table.state === true ? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4" onClick={() => editTables(table)}>Disponible</button> : <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " onClick={() => editTables(table)}>No Disponible</button>
                                    }
                                </td>
                                <td className="p-3 px-5">
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(table)}>Eliminar</button>
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
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full" onClick={createTables}>Crear Mesa</button>
            </div>
            {
                tables?.map((table) => (
                    <div className="bg-white shadow-md rounded-lg p-4 mb-2" key={`m-${table.id}`}>
                        <div className="flex space-x-3 justify-between items-end">
                            <div className="text-gray-700">
                                
                                <p className="font-semibold">N° Mesa: {table.num_Table}</p>
                                <p className="text-sm text-gray-500">Sillas: {
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => editNumeroChairs(table)}>{table.chairs}</button>
                                }</p>
                                <p className="text-sm text-gray-500">Estado: {table.state === true ? <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4" onClick={() => editTables(table)}>Disponible</button> : <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 " onClick={() => editTables(table)}>No Disponible</button>}</p>
                            </div>
                            <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleDelete(table)}>Eliminar</button>
                        </div>
                        </div>
                    </div>
                ))
            }
                </div>
        </div>
        )
    }

export default MannageTables;