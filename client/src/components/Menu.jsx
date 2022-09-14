import React from 'react';
import { useParams } from 'react-router-dom';
//import style from "./style/Menu.module.css";

const Menu = () => {
    const { name } = useParams();
    return (
        <div class="bg-gray-100 min-h-screen">
            <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Menu {name.charAt(0).toUpperCase() + name.slice(1)}</h2>

                <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div class="group relative">
                        <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:aspect-none lg:h-80">
                            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        Basic Tee
                                    </a>
                                </h3>
                            </div>
                            <p class="text-sm font-medium text-gray-900">$35</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;