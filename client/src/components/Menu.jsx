import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getMenuFilters } from "../redux/actions";
import { useParams } from 'react-router-dom';
//import style from "./style/Menu.module.css";

const Menu = () => {
    const dispatch = useDispatch();
    const { name } = useParams();
    const menu = useSelector((state) => state.menu);

    useEffect(() => {
        dispatch(getMenuFilters({ 'name': name }));
        // eslint-disable-next-line
    }, [])

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Menú {name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        menu.hasOwnProperty("food") ? menu.food.map(f => {
                            return (
                                <div className="group relative">
                                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:aspect-none lg:h-80">
                                        <img src={f.photo} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div className="text-md font-medium text-gray-900">{f.name}</div>
                                        <div className="text-md font-medium text-gray-900">${f.price}</div>
                                    </div>
                                </div>
                            );
                        }) : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Menu;