import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import style from "./style/Home.module.css";
import image from "../assets/home/burger-header.png"

const Home = () => {
    //const [menus, setMenus] = useState([]);
    const menus = [
        {
            "name": "Desayuno",
            "description": "Obtén la suficiente energía que necesitaras para empezar el día.",
            "photo": "https://images.hola.com/imagenes/cocina/noticiaslibros/20200213160483/dia-nacional-desayuno/0-782-593/portada-desayuno-adobe-m.jpg",
            "food": [
                {
                    "name": "Croissant",
                    "photo": "https://img-global.cpcdn.com/recipes/89a85ed6abb7858b/680x482cq70/croissant-francia-foto-principal.webp",
                    "price": "$150"
                }
            ]
        },
        {
            "name": "Almuerzo",
            "description": "Reabastece tu estomago con nuestra diversa selección para el almuerzo.",
            "photo": "https://recetasespecialesdecocina.files.wordpress.com/2018/10/asado.jpg",
            "food": []
        },
        {
            "name": "Cena",
            "description": "Finaliza el día comiendo con nosotros recibiendo nuestra hospitalidad.",
            "photo": "https://cdn7.kiwilimon.com/ss_secreto/3010/640x426/3010.jpg.webp",
            "food": []
        }
    ];

    /*useEffect(() => {
        axios.get(`http://localhost:3000/tables`).then(r => {
            setTables(r.data);
        });
        // eslint-disable-next-line
    }, []);*/

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
                        <h2 class="text-2xl font-bold text-gray-900 font-['Cabin_Sketch']">Menus</h2>
                        <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                menus.map(m => {
                                    return (
                                        <div class="group relative">
                                            <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                                <img src={m.photo} alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." class="h-full w-full object-cover object-center" />
                                            </div>
                                            <h3 class="mt-6 text-sm text-gray-500">
                                                <a href="#">
                                                    <span class="absolute inset-0"></span>
                                                    {m.name}
                                                </a>
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