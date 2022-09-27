import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getMenus } from "../redux/actions";
import style from "./style/Home.module.css";
import image from "../assets/home/burger-header.png"

const Home = () => {
    const dispatch = useDispatch();
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
            <div className="lg:h-screen bg-gradient-to-b from-red-900 to-gray-100 lg:grid lg:grid-cols-2 gap-x-6 pt-20 lg:pt-0">
                <div className="flex">
                    <div className="text-center text-white m-auto text-3xl sm:text-5xl md:text-7xl font-['Cabin_Sketch']">PFRestaurante</div>
                    
                </div>
                <div className="flex">
                    <img src={image} alt="" className="w-4/5 text-center m-auto" />
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:pt-8 lg:pb-32">
                        <h2 className="text-2xl font-bold text-gray-900 font-['Cabin_Sketch']">Menús</h2>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                menus.map(m => {
                                    return (
                                        <div className="group relative cursor-pointer" key={m.name}>
                                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                                <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <h3 className="mt-6 text-sm text-gray-500">
                                                <a href={`/menu/${m.name.toLowerCase()}`}>
                                                    <span className="absolute inset-0"></span>
                                                    {m.name}
                                                </a>
                                            </h3>
                                            <p className="text-base font-semibold text-gray-900">{m.description}</p>
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