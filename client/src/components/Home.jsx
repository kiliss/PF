import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getMenus } from "../redux/actions";
import style from "./style/Home.module.css";
import image from "../assets/home/burger-header.png"

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menus = useSelector((state) => state.menus).filter(m => m.name === "Desayuno" || m.name === "Almuerzo" || m.name === "Cena").sort(function (a, b) {
        if(a.name === "Desayuno" && b.name === "Almuerzo") return -1;
        if(a.name === "Almuerzo" && b.name === "Cena") return -1;
        return 1;
    });

    useEffect(() => {
        dispatch(getMenus());
        // eslint-disable-next-line
    }, [])

    return (
        <div className={style.container}>
            <div class="lg:h-screen bg-gradient-to-b from-red-900 to-gray-100 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
                <div class="flex">
                    <div class="text-center text-white m-auto text-7xl font-['Cabin_Sketch']">PFRestaurante</div>
                </div>
                <div class="flex">
                    <img src={image} alt="" class="w-4/5 text-center m-auto" />
                </div>
            </div>
            <div class="bg-gray-100">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:pt-8 lg:pb-32">
                        <h2 class="text-2xl font-bold text-gray-900 font-['Cabin_Sketch']">Menús</h2>
                        <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                menus.map(m => {
                                    return (
                                        <div class="group relative cursor-pointer">
                                            <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                                <img src={m.photo} alt={m.name} class="h-full w-full object-cover object-center" />
                                            </div>
                                            <h3 class="mt-6 text-sm text-gray-500">
                                                <div onClick={() => navigate(`/menu/${m.name.toLowerCase()}`)}>
                                                    <span class="absolute inset-0"></span>
                                                    {m.name}
                                                </div>
                                            </h3>
                                            <p class="text-base font-semibold text-gray-900">{m.description}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;