import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Menu as MenuReact, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux"
import { getMenu } from "../redux/actions";
import { useParams } from 'react-router-dom';
//import style from "./style/Menu.module.css";

const sortOptions = [
    { name: 'Más Nuevo', sort: '' },
    { name: 'Precios Bajos', sort: 'asc' },
    { name: 'Precios Altos', sort: 'desc' }
]
const subCategories = [
    { name: 'Todo en el Menú', filter: '' },
    { name: 'Todas las Bebidas', filter: 'drink' },
    { name: 'Todas las Comidas', filter: 'food' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Menu = () => {
    const dispatch = useDispatch();
    const { name } = useParams();
    const menu = useSelector((state) => state.menu);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [menuFilter, setMenuFilter] = useState('');
    const [menuSort, setMenuSort] = useState('');

    useEffect(() => {
        dispatch(getMenu({ 'name': name }));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(getMenu({ 'name': name, 'filter': menuFilter, 'price': menuSort }))
        // eslint-disable-next-line
    }, [menuFilter, menuSort])

    return (
        <div className="bg-gray-100 min-h-screen">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul className="px-2 py-3 font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li className='cursor-pointer' key={category.name} onClick={() => setMenuFilter(category.filter)}>
                                                    <div className="block px-2 py-3">
                                                        {category.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Menú {name.charAt(0).toUpperCase() + name.slice(1)}</h1>

                        <div className="flex items-center">
                            <MenuReact as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuReact.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Orden
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </MenuReact.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuReact.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuReact.Item key={option.name} onClick={() => setMenuSort(option.sort)}>
                                                    {({ active }) => (
                                                        <div
                                                            className={classNames(
                                                                menuSort === option.sort ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </div>
                                                    )}
                                                </MenuReact.Item>
                                            ))}
                                        </div>
                                    </MenuReact.Items>
                                </Transition>
                            </MenuReact>

                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filtros</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li className='cursor-pointer' key={category.name} onClick={() => setMenuFilter(category.filter)}>
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>

                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Replace with your content */}
                                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {
                                        menu.hasOwnProperty("food") ? menu.food.map(f => {
                                            return (
                                                <div className="group relative cursor-pointer" key={f.name}>
                                                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:aspect-none lg:h-80">
                                                        <img src={f.photo} alt={f.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                                    </div>
                                                    <div className="mt-4 text-sm text-gray-700">{f.name}</div>
                                                    <div className="mt-1 text-lg font-medium text-gray-900">${f.price}</div>
                                                </div>
                                            );
                                        }) : ""
                                    }
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Menu;