import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {getFoods, getMenus, addFoodToMenu, deleteFood} from "../redux/actions";

const TableAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                alert("This food is already in this menu");
            } else {
            dispatch(addFoodToMenu({
                menu : menu,
                food : foood
            }));
            alert("Food added to menu");
            navigate("/");
        } 
     } else {
            alert("Please select a menu");
        }
    }

    function handleDelete(e, id) {
        dispatch(deleteFood(id));
        alert("Food deleted");
        navigate("/");
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
                            <select className="bg-transparent" onChange={(e)=> handleChange(e)}>
                                            <option hidden select>Select Menu</option>
                                                {
                                                    menuus.map((menu) => {
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
                                    
                                                
                                            {
                                                food.menus?.map((menu) => {
                                                    return(
                                                        <option key={menu.id} value={menu.name} disabled selected>{menu.name}</option>
                                                    )
                                                })
                                            }
                                            <option selected disabled hidden>View Menus</option>
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