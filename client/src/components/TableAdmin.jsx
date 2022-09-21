import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getFoods, getMenus, addFoodToMenu, deleteFood} from "../redux/actions";
import swal from 'sweetalert';

const TableAdmin = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods);
    const menuus = useSelector((state) => state.menus);
    useEffect(() => {
        dispatch(getFoods());
        dispatch(getMenus());
    }, [dispatch]);
    const [menu, setMenu] = useState("")
    function handleChange(e) {
        setMenu(e.target.value);
    }
    function findFoodMenu(food) {
        let found = false;
        foods.forEach((foood) => {

            if(foood.name === food) {
                foood.menus.forEach((m) => {
                    if(m.name === menu) {
                        found = true;
                    }
                })

            }
        })
        return found;
    }
    function handleAdd(e, foood) {
        if(menu !== "") {
            if(findFoodMenu(foood)) {
                swal({
                    title: "La comida ya esta en el menu",
                    icon: "warning",
                    button: "Aceptar",
                });
                dispatch(getFoods());
                dispatch(getMenus());
            } else {
            dispatch(addFoodToMenu({
                menu : menu,
                food : foood
            }));
            swal({
                title: "Comida agregada al menu",
                icon: "success",
                button: "Aceptar",
            });
            dispatch(getFoods());
            dispatch(getMenus());
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
        swal({
            title: "Esta seguro que desea eliminar la comida?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
        if(willDelete) {
        dispatch(deleteFood(id));
        swal({
            title: "Comida eliminada",
            icon: "success",
            button: "Aceptar",
        });
        // alert("Comida eliminada");
        dispatch(getFoods());
        dispatch(getMenus());
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
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex">
                <h1 className="text-3xl">
                    Users
                </h1>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Food</th>
                            <th className="text-left p-3 px-5">View Menu</th>
                            <th className="text-left p-3 px-5">
                            <select className="bg-transparent" onChange={(e)=> handleChange(e)} defaultValue="Menu"  >
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
                                            <select className="bg-transparent">
                                            <option hidden>View Menus</option>
                                                
                                            {/* {
                                                food.menus?.map((menu) => {
                                                    return(
                                                        <option key={menu.id} value={menu.name} disabled>{menu.name}</option>
                                                    )
                                                })
                                            } */}
                                            
                                            </select>
                                        </td>
                                        <td className="p-3 px-5">{menu}
                                        </td>
                                        <td className="p-3 px-5 flex justify-end"><button type="button" onClick={(e)=> handleAdd(e, food.name)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save Menu</button><button type="button" onClick={(e) => handleDelete(e, food.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete Food</button></td>
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