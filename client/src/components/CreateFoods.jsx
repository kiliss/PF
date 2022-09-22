import React, {useState, useEffect} from "react";
import { Fragment } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import { postFood, getMenus, getFoods } from "../redux/actions";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function validate(input, findedName="", photo, state, state2){
  const errors = {}
  if(state2 === "validate2"){
    if(input.name.length < 3){
      errors.name = 'El nombre debe tener al menos 3 caracteres*'
    }
    if(!input.name){
      errors.name = 'Se requiere un nombre*'
    }
    if(!input.price){
      errors.price = 'Se requiere un precio*'
    }
    if(!input.summary){
      errors.description = 'Se requiere una descripción*'
    }
    if(!input.menu){
      errors.menu = 'Se requiere un menu*'
    }
    if(photo.length === 0){
      errors.photo = "Se requiere una imagen"
    }
    if(input.summary.length < 10){
      errors.description = 'La descripción debe tener al menos 10 caracteres*'
    }
  }
  if(state === "validate"){
    if(findedName === true){
      errors.name = 'El nombre ya existe'
    }
    if(input.name.charAt(0) === " "){
      errors.name = 'No se permiten espacios al inicio*'
    }
    if(input.name.length > 30){
      errors.name = 'El nombre no puede superar los 30 caracteres*'
    }
    if(input.price < 0){
      errors.price = 'El precio no puede ser negativo*'
    }
    if(input.summary.length > 200){
      errors.description = 'La descripción no puede superar los 200 caracteres*'
    }
    if(input.price > 999999){
      errors.price = 'El precio no puede superar los 6 digitos*'
    }
    if(input.name.substr(-1) === " "){
      errors.name = 'No se permiten espacios al final*'
    }
  }
  return errors
}





export default function CreateFoods(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [input, setInput] = useState({ // name, photo, summary, price, stock, menu, drinkable
    name: "",
    price: 0,
    summary: "",
    menu: "",
    drinkable: false,
    vegetarian: false,
    stock: true
  });
  const [error, setError] = useState({});

  const menus = useSelector((state) => state.menus);
  const foods = useSelector((state) => state.foods);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMenus());
    dispatch(getFoods());
  }, [dispatch]);


  const findName = (name) => {
    if(foods.find((food) => food.name.toLowerCase() === name.toLowerCase())){
      return true
    } else {
      return false
    }
  }

  
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let findedName = findName(e.target.value)
    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
    }, findedName, photo, "validate"));
  };

 


  const handleCheckboxChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    let findedName = findName(input.name)
    const aux = validate(input, findedName, photo, "validate", "validate2")
    setError(aux);
    if(Object.keys(aux).length === 0){
      dispatch(postFood({...input, photo: photo}));
      swal({
        title: "¡Éxito!",
        text: "Se ha creado el alimento",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
      // navigate("/");
      window.location.reload(false)
      });
    } else {
      swal({
        title: "¡Error!",
        text: "No se ha podido crear el alimento",
        icon: "error",
        button: "Aceptar",
      })
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Foodss");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzvqedesg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
    setLoading(false);
  };


    return (
      <Transition.Root show={props.open} as={Fragment}>
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
                      <Dialog.Panel className=" flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                          <div className="rounded-2xl relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                              <button
                                  type="button"
                                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                  onClick={() => props.setOpen(false)}
                              >
                                  <span className="sr-only">Close</span>
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>








        <div className="w-full">
          <div>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md ">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6 ">
                      <div className="col-span-3 sm:col-span-2 ">
                      <div className="col-span-6 sm:col-span-3 ">
          <div className="mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Crear Producto</h1>
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" value= {input.name} name= "name" placeholder="Hamburguesa" onChange={(e) => handleInputChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {error.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.name} </span>}
        </div>
                      </div>
                      <div>
      <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
        Precio
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="number"
          name="price"
          className="bg-gray-50 rounded-md border-gray-300 pl-7  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0.00"
          value= {input.price} onChange={(e) => handleInputChange(e)}
        />
      </div>
        {error.price && <p className="font-medium tracking-wide text-red-500 text-xs mb-1 ml-1"> {error.price} </p>}
    </div>
                      </div>
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Detalle
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="summary"
                          rows={3}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Tomate, lechuga, queso, etc."
                          value= {input.summary} onChange={(e) => handleInputChange(e)}
                        />
                        {error.description && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.description} </span>}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Ingrese los detalles de los ingredientes de la comida.
                      </p>
                    </div>

                    <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              name="vegetarian"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              value= {input.vegetarian} onChange={ (e) => handleCheckboxChange(e)}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">
                              Comida vegana
                            </label>
                            <p className="text-gray-500">Marque la casilla si la comida es vegetariana</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              name="drinkable"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              value= {input.drinkable} onChange={ (e) => handleCheckboxChange(e)}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              Bebida
                            </label>
                            <p className="text-gray-500">Marque la casilla si es una bebida.</p>
                          </div>
                        </div>
                      </div>

                    <div>
                    <label htmlFor="menu" className="block text-sm font-medium text-gray-700">
                          Menu
                        </label>
                        <select
                          name="menu"
                          value= {input.menu} onChange={(e) => handleInputChange(e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="0" hidden>Seleccione un menu</option>
                          {
                            menus?.map((menu) => (
                              <option key={menu.id} value={menu.name}>{menu.name}</option>
                            ))
                          }
                        </select>
                        {error.menu && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.menu} </span>}
                    </div>
  


                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ingresar Imagen*</label>
                    {error.photo && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.photo} </span>}
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
                            loading ? null : <img src={photo} style={{width: '300px'}}  alt= "Food imag" className="ml-4 rounded-2xl border-2 border-gray-700"/>
                          }
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </Dialog.Panel>
                        </Transition.Child>
                    </div>

                </div>
            </Dialog>
        </Transition.Root>  
    )
  }
  