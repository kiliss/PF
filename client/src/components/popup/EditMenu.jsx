import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { updateMenu } from '../../redux/actions/index';
import { useState } from "react";
import swal from "sweetalert";


const validationForm = (input, photo, existe) => {
    let errors = {};
    if (input.name !== "" && input.name.length < 3) {
        errors.name = "El nombre debe tener al menos 3 caracteres";
    }
    if (existe) {
        errors.name = "El menu ya existe";
    }
    if (input.description !== "" && input.description.length < 3) {
        errors.description = "La descripción debe tener al menos 3 caracteres";
    }
    if (photo !== "" && photo.length < 3) {
        errors.photo = "Debe seleccionar una imagen";
    }
    return errors
};

const EditMenu = (props) => {
    const dispatch = useDispatch();
   
    let menu = useSelector((state) => state.menu);
    let menus = useSelector((state) => state.menus);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        visible: menu.visible,
        homeVisible: menu.homeVisible,
    })
    const [photo, setPhoto] = useState("");
    const [charge, setCharge] = useState(true);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Foodss");
    setCharge(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzvqedesg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setCharge(false);
  };

  const findName = (name) => {
    if(menus.find((f) => f.name.toLowerCase() === name.toLowerCase())){
      return true
    } else {
      return false
    }
  }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const aux = validationForm(input, photo, findName(input.name))
        setErrors(aux)
        if (Object.keys(aux).length === 0) {
            dispatch(updateMenu(menu.name, {
                name: input.name === "" ? menu.name : input.name,
                description: input.description === "" ? menu.description : input.description,
                photo: photo === "" ? menu.photo : photo,
                visible: input.visible,
                homeVisible: input.homeVisible
            }))
            swal({
                title: "Menu creado",
                icon: "success",
                button: "Aceptar",
            }).then(() => {
            props.setOpen(false)
            window.location.reload(false)
            })
        } else {
            swal({
                title: "Error al crear el menu",
                icon: "warning",
                button: "Aceptar",
            });
        }
    };


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
                                                <h3 className="text-xl font-bold text-red-700">Ingrese Los Datos Que Quiere Editar</h3>
                                                <button onClick={() => props.setOpen(false)} className="text-gray-400 hover:text-gray-500">
                                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                                </button>
                                            </div>

                                            <div
                                                className="px-4 pt-8 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                                            >
                                                        <div className="mb-3">
                                                            <label className="block text-sm font-medium text-gray-700">Nombre Del Menu</label>
                                                            <input type="text" name = "name" placeholder={menu.name} onChange={(e) => handleInputChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                                            {errors.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {errors.name} </span>}
                                                        </div>
                                                    <div className="mb-3">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Detalle
                                                            </label>
                                                        <div className="mt-1">
                                                            <textarea
                                                                name="description"
                                                                rows={3}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder={menu.description}
                                                                onChange={(e) => handleInputChange(e)}
                                                            />
                                                            {errors.description && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {errors.description} </span>}
                                                        </div>
                                                    </div>
                                                        <div>
                                                        <label className="block text-sm font-medium text-gray-700">Ingresar Imagen*</label>
                                                        {errors.photo && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {errors.photo} </span>}
                                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                            <div className="space-y-1 text-center">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label
                                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                >
                                                                <span>Subir foto</span>
                                                                <input name="photo" type="file" value={input.photo} onChange={uploadImage} className="sr-only" />
                                                                </label>
                                                                <p className="pl-1">para la comida</p>
                                                            </div>
                                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                            
                                                            </div>
                                                            {
                                                                charge ? null : <img src={photo} style={{width: '300px'}}  alt= "Food imag" className="ml-4 rounded-2xl border-2 border-gray-700"/>
                                                                }
                                                            </div>
                                                        </div>
                                                <div>
                                                    <button
                                                        className="mt-4 hover:shadow-form w-full rounded-md bg-red-700 hover:bg-red-900 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                                        type='submit'
                                                        onClick={(e) => handleSubmit(e)}
                                                    >
                                                        Editar Menu
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


export default EditMenu;