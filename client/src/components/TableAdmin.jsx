import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getFoods, getMenus, addFoodToMenu, deleteFood, getFood, deleteFoodFromMenu} from "../redux/actions";
import FoodEdit from "./FoodEdit";
import swal from 'sweetalert';
import CreateFoods from './CreateFoods';


const TableAdmin = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
    const menuus = useSelector((state) => state.menus);
    const [menu, setMenu] = useState("")
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [charge, setCharge] = useState(false)

    useEffect(() => {
        dispatch(getFoods());
        dispatch(getMenus());
        setCharge(false)
    }, [dispatch, charge, openEdit]);
  
    function handleChange(e) {
        setMenu(e.target.value);
    }

    function handleAdd(e, foood) {
        e.preventDefault();
        const find = foood.menus.find(el => el.name === menu)
        if(menu !== "") {
            if(find) {
                swal({
                    title: "La comida ya esta en el menu",
                    icon: "warning",
                    button: "Aceptar",
                });
            } else {
            //preguntar si agregar o no
                swal({
                    title: "¿Desea agregar la comida al menu?",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
            dispatch(addFoodToMenu({
                menu : menu,
                food : foood.name
            }));
            dispatch(getFoods());
            setCharge(true)
            swal({
                title: "Comida agregada al menu",
                icon: "success",
                button: "Aceptar",
            })
        }});
            }
     } else {
            swal({
                title: "Debe seleccionar un menu",
                icon: "warning",
                button: "Aceptar",
            });
        }
    }

    function handleDelete(e, id) {
        e.preventDefault();
        swal({
            title: "Esta seguro que desea eliminar la comida?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
        if(willDelete) {
        dispatch(deleteFood(id));
        dispatch(getFoods());
        setCharge(true)
        swal({
            title: "Comida eliminada",
            icon: "success",
            button: "Aceptar",
        });
        }
        });
    }
    function handleDeleteMenu(e, food) {
        e.preventDefault();
        const find = food.menus.find(el => el.name === menu)
        if(menu === "") {
            swal({
                title: "Debe seleccionar un menu",
                icon: "warning",
                button: "Aceptar",
            });
        } else {
            if(!find) {
                swal({
                    title: "La comida no esta en el menu",
                    icon: "warning",
                    button: "Aceptar",
                })
            } else {
        swal({
            title: "Esta seguro que desea eliminar la comida del menu?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
        if(willDelete) {
        dispatch(deleteFoodFromMenu({
            menu : menu,
            food : food.name
        }));
        dispatch(getFoods());
        setCharge(true)
        swal({
            title: "Comida eliminada del menu",
            icon: "success",
            button: "Aceptar",
        });
        }
        });
    }}
    }
    return (
        <div className="text-gray-900 min-h-screen bg-gray-200 mt-14 overflow-x-auto">
        {
            open && <FoodEdit open={open} setOpen={setOpen}/>
        }
        {

            openEdit && <CreateFoods open={openEdit} setOpen={setOpenEdit}/>
        }
            <div className="px-3 py-4 flex justify-center overflow-auto">
                <table className=" text-md bg-white shadow-md rounded mb-4 hidden md:block">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Foto</th>
                            <th className="text-left p-3 px-5">Nombre</th>
                            <th className="text-left p-3 px-5">Detalle</th>
                            <th className="text-left p-3 px-5">
                            <select className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onChange={(e)=> handleChange(e)} defaultValue="Menu"  >
                                            <option hidden>Selecciona Menú</option>
                                                {
                                                    menuus?.map((menu) => {
                                                        return(
                                                            <option key={menu.id} value={menu.name}>{menu.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                            </th>
                            <th><button onClick={() => setOpenEdit(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full mr-4 rounded-full">Crear Producto</button></th>

                        </tr>
                        {
                            foods?.map((food) => {
                                return(
                                    <tr className="border-b hover:bg-orange-100 bg-gray-100" key={food.id}>
                                        <td className="p-3 px-5">
                                        <img className="h-24 w-24 rounded-full object-cover" src={food.photo} alt= {food.name} />
                                        </td>
                                        <td className="p-3 px-5">{food.name}</td>
                                        <td className="p-3 px-5">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { dispatch(getFood(food.id)); setOpen(true) }}>Editar</button>
                                        </td>
                                        <td className="p-3 px-5 font-bold text-orange-500">{menu}
                                        </td>
                                        <td className="p-3 px-5 flex justify-end"><button type="button" onClick={(e)=> handleAdd(e, food)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Añadir Menú</button><button type="button" onClick={(e) => handleDeleteMenu(e, food)} className="mr-5 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Quitar Menú</button><button type="button" onClick={(e) => handleDelete(e, food.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Borrar Producto</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 gap-4 md:hidden">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="flex flex-col">
                            <div className="text-gray-500">                            <select className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onChange={(e)=> handleChange(e)} defaultValue="Menu"  >
                                <option hidden>Selecciona Menú</option>
                                    {
                                        menuus?.map((menu) => {
                                            return(
                                                <option key={menu.id} value={menu.name}>{menu.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button onClick={() => setOpenEdit(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full mt-4 rounded-full">Crear Producto</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    foods?.map((food) => {
                        return(
                            <div className="bg-white p-4 rounded-lg shadow mb-2" key={food.id}>
                                <div className="flex items-center space-x-2 text-sm">
                                    <div className="flex flex-col">
                                        <div className="font-bold">{food.name}</div>
                                        <div className="font-bold text-orange-500">{menu}</div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mr-3" onClick={() => { dispatch(getFood(food.id)); setOpen(true) }}>Editar</button><button type="button" onClick={(e)=> handleAdd(e, food)} className="mr-3 px-2 text-sm bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline">Añadir Menú</button><button type="button" onClick={(e) => handleDeleteMenu(e, food)} className="mr-3 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Quitar Menú</button><button type="button" onClick={(e) => handleDelete(e, food.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Borrar Producto</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default TableAdmin;