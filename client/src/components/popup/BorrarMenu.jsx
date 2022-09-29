import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getMenus, deleteMenu } from '../../redux/actions/index';
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";


const BorrarMenu = (props) => {
    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menus);
    useEffect(() => {
        dispatch(getMenus());
    }, [dispatch])

    let menusArray = [];
    menus.forEach((menu) => {
      menusArray.push(menu.name);
    });
    const [menusState, setMenusState] = useState(menusArray);
    const [menu, setMenu] = useState([]);
    function handleSelect(e) {
        const Menu = e.target.value;
        // quitar del array lo seleccionado
        if(!menu.includes(Menu)){
            setMenu([...menu, Menu]);
            setMenusState(menusState.filter((el) => el !== Menu));
        }
     }
    function handleDelete(el) {
        //al borrar algregar al array de select
        setMenusState([...menusState, el]);
        setMenu(menu.filter(t => t !== el))
    }


    function handleSubmit() {
        if(menu.length === 0) {
            swal({
                title: "Debe seleccionar un menu",
                icon: "warning",
                button: "Aceptar",
            });
        } else {
        swal({
            title: "¿Desea borrar el menu?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                menu.forEach((el) => {
                    dispatch(deleteMenu(el));
                });
                swal({
                    title: "Menu borrado",
                    icon: "success",
                    button: "Aceptar",
                });
                props.setOpen(false);
            } else {
                swal({
                    title: "Menu no borrado",
                    icon: "error",
                    button: "Aceptar",
                });
            }
        });
        }
    }

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                {/* <form onSubmit={(e) => handleSubmit(e)}> */}
                                <div className="relative flex w-full items-center overflow-hidden bg-white rounded-lg">
                                    <div className="flex w-full items-center justify-center">

                                        <div className="mx-auto w-full bg-white">

                                            <div
                                                className="flex w-full items-center justify-between py-4 px-9 border-b border-gray-200"
                                            >
                                                <h3 className="text-xl font-bold text-red-700">Borrar Menu</h3>
                                                <button onClick={() => props.setOpen(false)} className="text-gray-400 hover:text-gray-500">
                                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                                </button>
                                            </div>

                                            <div
                                                className="px-4 pt-8 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-3"
                                            >




                                                <div className="flex flex-col"> {
                                                        menusState.length > 0 ?  <select
                                                        onChange={(e) => handleSelect(e)}
                                                        className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        <option value="0" hidden>Seleccione un menu</option>
                                                        {
                                                        menusState?.map((menu) => (
                                                            <option key= {menu+Math.random()} value={menu}>{menu}</option>
                                                        ))
                                                        }
                                                    </select> : <p className="text-gray-500 mb-5">Se acabaron los menus</p>
                                                    }


                                                    <div className="mb-3 flex justify-content: flex-start flex-wrap">
                                                        {menu.map(el => <div key= {el+Math.random()} className= "mr-3 flex items-center bg-red-400 px-5 py-2 rounded-lg"><p>{el}</p><button onClick={() => handleDelete(el)} className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button></div>)}
                                                    </div>



                                                    </div>


                                                <div>
                                                    <button
                                                        className="hover:shadow-form w-full rounded-md bg-red-700 hover:bg-red-900 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                                        type='submit'
                                                        onClick={() => handleSubmit()}
                                                    >
                                                        Borrar
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* </form> */}


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}


export default BorrarMenu;