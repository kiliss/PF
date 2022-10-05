
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMenus, updateMenu, getMenu} from "../redux/actions";
import CreateMenu from './popup/CreateMenu';
import BorrarMenu from './popup/BorrarMenu';
import EditMenu from './popup/EditMenu';
import swal from "sweetalert";

const MenuTable = () => {
    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menus);

    useEffect(() => {
        dispatch(getMenus());
    }, [dispatch]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreateMenu, setOpenCreateMenu] = useState(false)
    const [openDeleteMenu, setOpenDeleteMenu] = useState(false)


    function changeVisibility(e, menu) {
        e.preventDefault();
        swal({
            title: "¿Desea cambiar la visibilidad del Menu?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            dispatch(updateMenu(menu.name, {name:menu.name, photo:menu.photo, description:menu.description, visible: !menu.visible, homeVisible: menu.homeVisible})).then(() => {
        swal({
            title: "Visibilidad cambiada",
            icon: "success",
            button: "Aceptar",
        });
        dispatch(getMenus());
            }
        )}
        });
    }
    function changeHomeVisibility(e, menu) {
        e.preventDefault();
        swal({
            title: "¿Desea cambiar la visibilidad del Menu en el Home?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            dispatch(updateMenu(menu.name, {name:menu.name, photo:menu.photo, description:menu.description, visible: menu.visible, homeVisible: !menu.homeVisible})).then(() => {
        swal({
            title: "Visibilidad cambiada",
            icon: "success",
            button: "Aceptar",
        });
        dispatch(getMenus());
            }
        )}
        });
    }
    function getMenuPopUp(menu) {
        setOpenEdit(true);
        dispatch(getMenu({name: menu.name}));
    }

    return (
    <div className="text-gray-900 bg-gray-200 min-h-screen overflow-x-auto">
        {
            openCreateMenu && <CreateMenu open={openCreateMenu} setOpen={setOpenCreateMenu}/>
        }
        {
            openDeleteMenu && <BorrarMenu open={openDeleteMenu} setOpen={setOpenDeleteMenu}/>
        }
        {
            openEdit && <EditMenu open={openEdit} setOpen={setOpenEdit} />
        }
    <div className="px-3 py-2 flex justify-center">
        <table className="text-md bg-white shadow-md rounded mb-4 hidden md:table w-full mt-16">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Foto</th>
                    <th className="text-left p-3 px-5">Nombre</th>
                    <th className="text-left p-3 px-5">
                        Editar
                    </th>
                    <th className="text-left p-3 px-5">
                    <button onClick={() => setOpenCreateMenu(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 mt-4">Crear Menú</button>
                    <button onClick={() => setOpenDeleteMenu(true)} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full ml-4 mt-4">Borrar Menú</button>
                    </th>
                </tr>
                {
                    menus?.map((menu) => (
                        <tr className="border-b hover:bg-orange-100 bg-gray-100" key= {menu.id}>
                            <td className="p-3 px-5"><img className="h-24 w-24 rounded-full" src={menu.photo} alt= {menu.name} /></td>
                            <td className="p-3 px-5">{menu.name}</td>
                            <td className="p-3 px-5">
                                {
                                    <button onClick={() => getMenuPopUp(menu)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Editar</button>
                                }
                            </td>
                            <td className="p-3 px-5">
                                {
                                    !menu.visible ? <button onClick={(e)=>changeVisibility(e, menu)} className="mr-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">Activar</button> : <button onClick={(e)=>changeVisibility(e, menu)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ">Desactivar</button>
                                }
                                {
                                    !menu.homeVisible ? <button onClick={(e)=>changeHomeVisibility(e, menu)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">Añadir a Home</button> : <button onClick={(e)=>changeHomeVisibility(e, menu)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ">Quitar de Home</button>
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    <div className="grid grid-cols-1 gap-4 md:hidden mt-20">
                    <div className="bg-white shadow-md rounded-lg pb-4 mb-2 ml-2 mr-2">
                        <div className="flex items-center space-x-3 flex flex-col">
                            <div className="text-gray-700">
                                <button onClick={() => setOpenCreateMenu(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4 mt-4">Crear Menú</button>
                                <button onClick={() => setOpenDeleteMenu(true)} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full ml-4 mt-4">Borrar Menú</button>
                            </div>
                        </div>
                    </div>
                {
                    menus?.map((menu) => {
                        return (
                            <div className="bg-white shadow-md rounded-lg p-4 mb-2" key={menu.id}>
                                <div className="flex items-center space-x-3">
                                    <img className="h-8 w-8 rounded-full object-cover " src={menu.photo} alt={menu.user} />
                                    <div className="text-gray-700">
                                        <p className="font-semibold">{menu.name} <button onClick={() => getMenuPopUp(menu)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Editar</button></p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {
                                        !menu.visible ? <button onClick={(e)=>changeVisibility(e, menu)} className="mr-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">Activar</button> : <button onClick={(e)=>changeVisibility(e, menu)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ">Desactivar</button>
                                    }
                                    {
                                        !menu.homeVisible ? <button onClick={(e)=>changeHomeVisibility(e, menu)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4">Añadir a Home</button> : <button onClick={(e)=>changeHomeVisibility(e, menu)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ">Quitar de Home</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    </div>
    );
};

export default MenuTable;