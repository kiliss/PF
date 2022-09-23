import React, { Fragment, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, /*BellIcon,*/ XMarkIcon } from '@heroicons/react/24/outline';
import Reservation from './popup/Reservation';
import jwt_decode from "jwt-decode";

const visitorNavigation = [
    { name: 'Productos', href: '/products' }
];

const userNavigation = [];

const adminNavigation = [
    { name: 'Crear Producto', href: '/product/create' }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const location = useLocation();
    const [openReservation, setOpenReservation] = useState(false);

    const { admin, photo } = localStorage.getItem('user') ? jwt_decode(localStorage.getItem('user')) : { 'admin': false, 'photo': '' };

    return (
        <>
            {
                localStorage.getItem('user') && !admin && openReservation && <Reservation setOpen={setOpenReservation} />
            }
            <Disclosure as="nav" className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <a href='/'>
                                            <img
                                                className="block h-8 w-auto lg:hidden mr-1"
                                                src="https://images.vexels.com/media/users/3/143047/isolated/preview/b0c9678466af11dd45a62163bdcf03fe-icono-plano-de-hamburguesa-de-comida-rapida.png"
                                                alt="Your Company" />
                                            <img
                                                className="hidden h-8 w-auto lg:block mr-1"
                                                src="https://images.vexels.com/media/users/3/143047/isolated/preview/b0c9678466af11dd45a62163bdcf03fe-icono-plano-de-hamburguesa-de-comida-rapida.png"
                                                alt="Your Company" />
                                        </a>
                                        <a href='/'>
                                            <span className="hidden lg:block self-center text-xl font-semibold whitespace-nowrap text-red-700">PFRestaurante</span>
                                        </a>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {visitorNavigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            {localStorage.getItem('user') && userNavigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            {admin && adminNavigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {localStorage.getItem('user') ?
                                        <>
                                            {
                                                /*<button
                                                    type="button"
                                                    className="rounded-full bg-red-700 p-1 text-white hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="sr-only">View notifications</span>
                                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>*/
                                            }

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex rounded-full bg-gray-200 text-sm focus:outline-none ring-2 ring-gray-200 hover:ring-red-900">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={photo}
                                                            alt="" />
                                                    </Menu.Button>
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
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/profile"
                                                                    className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                                                                >
                                                                    Ver Perfíl
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        {
                                                            localStorage.getItem('user') && !admin && <Menu.Item>
                                                                {({ active }) => (
                                                                    <div
                                                                        className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black cursor-pointer')}
                                                                        onClick={() => setOpenReservation(true)}
                                                                    >
                                                                        Reservación
                                                                    </div>
                                                                )}
                                                            </Menu.Item>
                                                        }
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/"
                                                                    className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                                                                    onClick={() => localStorage.removeItem('user')}
                                                                >
                                                                    Cerrar Sesión
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </>
                                        :
                                        <div className="sm:ml-6 sm:block">
                                            <div className="flex space-x-4">
                                                <a
                                                    href={'/login'}
                                                    className={'bg-red-700 hover:bg-red-900 text-white px-3 py-2 rounded-md text-sm font-medium'}
                                                    aria-current={undefined}
                                                >
                                                    {'Iniciar Sesión'}
                                                </a>
                                            </div>
                                        </div>}
                                </div>

                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {visitorNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={location.pathname === item.href ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default Navbar;