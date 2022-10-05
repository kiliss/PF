import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getVisibleMenus } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, /*BellIcon,*/ XMarkIcon } from '@heroicons/react/24/outline';
import Reservation from './popup/Reservation';
import jwt_decode from "jwt-decode";
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

const visitorNavigation = [
    { name: 'Productos', href: '/products' }
];

const userNavigation = [];

const adminNavigation = [
    { name: 'Productos', href: '/manage/products' },
    { name: 'Menús', href: '/manage/menus' },
    { name: 'Usuarios', href: '/manage/users' },
    { name: 'Reservaciones', href: '/manage/reservations' },
    { name: "Mesas", href: "/manage/tables" }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const location = useLocation();
    const [openReservation, setOpenReservation] = useState(false);
    const [onHover, setOnHover] = useState('');
    const [onMobileMenu, setOnMobileMenu] = useState(false);
    const [onMobileAdmin, setOnMobileAdmin] = useState(false);

    const localS = localStorage.getItem('session');

    const { admin } = localS ? jwt_decode(localS) : { 'admin': false };

    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menusNavbar);

    useEffect(() => {
        dispatch(getVisibleMenus());
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {
                localS && !admin && openReservation && <Reservation setOpen={setOpenReservation} />
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
                                    <div className="flex flex-shrink-0 items-center" onMouseEnter={() => setOnHover('')}>
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
                                            {visitorNavigation?.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                    onMouseEnter={() => setOnHover(item.name)}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                            <button
                                                className={classNames(
                                                    'peer text-black hover:bg-gray-500 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={undefined}
                                                onMouseEnter={() => setOnHover('menus')}
                                            >
                                                Menús
                                            </button>
                                            {
                                                localS && admin && <button
                                                    className={classNames(
                                                        'peer text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={undefined}
                                                    onMouseEnter={() => setOnHover('admin')}
                                                >
                                                    Administrar
                                                </button>
                                            }
                                            {localS && userNavigation?.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href ? 'bg-red-700 text-white' : 'text-black hover:bg-gray-500 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                    onMouseEnter={() => setOnHover(item.name)}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {localS ?
                                        <>
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3" onMouseEnter={() => setOnHover('')}>
                                                <div className='flex gap-x-2 items-center'>
                                                    {
                                                        //<span className="hidden md:block text-black text-sm font-medium">{localStorage.getItem('name')}</span>
                                                    }
                                                    <Menu.Button className="flex rounded-full bg-gray-200 text-sm focus:outline-none ring-2 ring-gray-200 hover:ring-red-900">
                                                        <img
                                                            loading='eager'
                                                            className="h-8 w-8 rounded-full"
                                                            referrerPolicy="no-referrer"
                                                            src={localStorage.getItem('photo')}
                                                            alt="foto de usario"
                                                        />
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
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/chat"
                                                                    className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                                                                >
                                                                    Chat de Preguntas
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        {
                                                            localS && !admin && <Menu.Item>
                                                                {({ active }) => (
                                                                    <a
                                                                        href="/reservation"
                                                                        className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                                                                    >
                                                                        Reservación
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        }
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="/"
                                                                    className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                                                                    onClick={() => { localStorage.removeItem('session'); localStorage.removeItem('photo'); localStorage.removeItem('name') }}
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
                                        <div className="sm:ml-6 sm:block" onMouseEnter={() => setOnHover('')}>
                                            <div className="flex space-x-4">
                                                <a
                                                    href={'/login'}
                                                    className={'bg-red-700 hover:bg-red-900 text-white px-3 py-2 rounded-md text-sm font-medium'}
                                                    aria-current={undefined}
                                                >
                                                    Iniciar Sesión
                                                </a>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            onHover === 'menus' && <div className="py-6 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 border-t border-gray-300" onMouseLeave={() => setOnHover('')}>
                                <div className="space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
                                    {
                                        menus?.map(m => {
                                            return (
                                                <a className="flex cursor-pointer" key={`navbar-menus-${m.name}`} href={`/menu/${m.name.toLowerCase()}`}>
                                                    <div className="group flex w-8 h-8 overflow-hidden rounded-lg bg-white">
                                                        <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-center" />
                                                    </div>
                                                    <h3 className="text-lg text-gray-700 text-sm font-normal ml-2">
                                                        {m.name}
                                                    </h3>
                                                </a>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        }
                        {
                            onHover === 'admin' && <div className="py-6 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 border-t border-gray-300" onMouseLeave={() => setOnHover('')}>
                                <div className="space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
                                    {
                                        adminNavigation?.map(a => {
                                            return (
                                                <a className="flex cursor-pointer" key={`navbar-admin-${a.name}`} href={a.href}>
                                                    <h3 className="text-lg text-gray-700 text-sm font-normal ml-2">
                                                        {a.name}
                                                    </h3>
                                                </a>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        }
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {visitorNavigation?.map((item) => (
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
                                {localS && userNavigation?.map((item) => (
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
                                <div
                                    className={'text-black hover:bg-gray-500 hover:text-white flex px-3 py-2 rounded-md text-base font-medium cursor-pointer justify-between items-center'}
                                    onClick={() => setOnMobileMenu(!onMobileMenu)}
                                >
                                    <span className="font-medium">Menús</span>
                                    <span className="ml-6 flex items-center">
                                        {onMobileMenu ? (
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </span>
                                </div>
                                {menus?.map((m) => (
                                    onMobileMenu && <Disclosure.Button
                                        key={`mobile-navbar-${m.name}`}
                                        as="a"
                                        href={`/menu/${m.name.toLowerCase()}`}
                                        className={classNames(
                                            location.pathname === `/menu/${m.name.toLowerCase()}` ? 'bg-red-700 text-white' : 'text-gray-500 hover:bg-gray-500 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={location.pathname === `/menu/${m.name.toLowerCase()}` ? 'page' : undefined}
                                    >
                                        {m.name}
                                    </Disclosure.Button>
                                ))}
                                {
                                    localS && admin && <div
                                        className={'text-black hover:bg-gray-500 hover:text-white flex px-3 py-2 rounded-md text-base font-medium cursor-pointer justify-between items-center'}
                                        onClick={() => setOnMobileAdmin(!onMobileAdmin)}
                                    >
                                        <span className="font-medium">Administrar</span>
                                        <span className="ml-6 flex items-center">
                                            {onMobileAdmin ? (
                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </span>
                                    </div>
                                }
                                {
                                    localS && admin && adminNavigation?.map((a) => (
                                        onMobileAdmin && <Disclosure.Button
                                            key={`mobile-navbar-${a.name}`}
                                            as="a"
                                            href={a.href}
                                            className={classNames(
                                                location.pathname === a.href ? 'bg-red-700 text-white' : 'text-gray-500 hover:bg-gray-500 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={location.pathname === a.href ? 'page' : undefined}
                                        >
                                            {a.name}
                                        </Disclosure.Button>
                                    ))
                                }
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default Navbar;