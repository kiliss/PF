import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getFoods, getMenus, addFoodToMenu, deleteFood, getFood} from "../redux/actions";
import Food from "./Food";
import swal from 'sweetalert';

const TableAdmin = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
    const menuus = useSelector((state) => state.menus);
    const [menu, setMenu] = useState("")
    const [open, setOpen] = useState(false)
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
            });
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
        } else {
            swal({
                title: "Comida no eliminada",
                icon: "success",
                button: "Aceptar",
            });
        }
        });
    }

    
    return (
        <div className="text-gray-900 bg-gray-200 mt-14">
            <Food open={open} setOpen={setOpen} />
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Food</th>
                            <th className="text-left p-3 px-5">Detail</th>
                            <th className="text-left p-3 px-5">
                            <select className="bg-transparent" onChange={(e)=> handleChange(e)} defaultValue="Menu"  >
                                            <option hidden>Add Menu</option>
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
                                        <td className="p-3 px-5">{menu}
                                        </td>
                                        <td className="p-3 px-5 flex justify-end"><button type="button" onClick={(e)=> handleAdd(e, food)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save Menu</button><button type="button" onClick={(e) => handleDelete(e, food.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete Food</button></td>
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