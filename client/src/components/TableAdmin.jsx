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
    }, [dispatch, charge]);
  
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
        <div className="text-gray-900 min-h-screen bg-gray-200 mt-14">
            <FoodEdit open={open} setOpen={setOpen}/>
            <CreateFoods open={openEdit} setOpen={setOpenEdit}/>
            <button onClick={() => setOpenEdit(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 mt-4">Crear comida</button>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Food</th>
                            <th className="text-left p-3 px-5">Detail</th>
                            <th className="text-left p-3 px-5">
                            <select className="bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onChange={(e)=> handleChange(e)} defaultValue="Menu"  >
                                            <option hidden>Select Menu</option>
                                                {
                                                    menuus?.map((menu) => {
                                                        return(
                                                            <option key={menu.id} value={menu.name}>{menu.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                            </th>
                            <th></th>
                        </tr>
                        {
                            foods?.map((food) => {
                                return(
                                    <tr className="border-b hover:bg-orange-100 bg-gray-100" key={food.id}>
                                        <td className="p-3 px-5">{food.name}</td>
                                        <td className="p-3 px-5">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { dispatch(getFood(food.id)); setOpen(true) }}>View</button>
                                        </td>
                                        <td className="p-3 px-5 font-bold text-orange-500">{menu}
                                        </td>
                                        <td className="p-3 px-5 flex justify-end"><button type="button" onClick={(e)=> handleAdd(e, food)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save Menu</button><button type="button" onClick={(e) => handleDeleteMenu(e, food)} className="mr-5 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete Menu</button><button type="button" onClick={(e) => handleDelete(e, food.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete Food</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default TableAdmin;