import React, {useState, useEffect} from "react";
import { Fragment } from 'react';
import {useDispatch, useSelector} from "react-redux";
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
  const [photo, setPhoto] = useState("");
  const [input, setInput] = useState({ // name, photo, summary, price, stock, menu, drinkable
    name: "",
    price: 0,
    summary: "",
    menu: [],
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

  // guardar menus en un array
  let menusArray = [];
  menus.forEach((menu) => {
    menusArray.push(menu.name);
  });
  const [menusState, setMenusState] = useState(menusArray);



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
  function handleSelect(e) {
    const menus = e.target.value;
    // quitar del array lo seleccionado
    if(!input.menu.includes(menus)){
      setMenusState(menusState.filter((menu) => menu !== menus));
            setInput({
        ...input,
        menu: [...input.menu, menus]
     })
    }
 }
 function handleDelete(el) {
  //al borrar algregar al array de select
  setMenusState([...menusState, el]);

  setInput({
      ...input,
      menu: input.menu.filter(t => t !== el)
  })
}



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

                          <div className="relative flex w-full items-center overflow-hidden bg-white rounded-lg">
                              <div className="flex w-full items-center justify-center">

                                  <div className="mx-auto w-full bg-white">

                                      <div
                                          className="flex w-full items-center justify-between py-4 px-9 border-b border-gray-200"
                                      >
                                          <h3 className="text-xl font-bold text-red-700">Crear Producto</h3>
                                          <button onClick={() => props.setOpen(false)} className="text-gray-400 hover:text-gray-500">
                                              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                          </button>
                                      </div>





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
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" value= {input.name} name= "name" placeholder="Hamburguesa" onChange={(e) => handleInputChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {error.name && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.name} </span>}
        </div>
                      </div>
                      <div>
      <label className="block text-sm font-medium text-gray-700">
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
                            <label  className="font-medium text-gray-700">
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
                    <label className="block text-sm font-medium text-gray-700">
                          Menu
                        </label>
                        {
                          menusState.length > 0 ?                         <select
                          onChange={(e) => handleSelect(e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="0" hidden>Seleccione un menu</option>
                          {
                            menusState?.map((menu) => (
                              <option key= {menu+Math.random()} value={menu}>{menu}</option>
                            ))
                          }
                        </select> : <p className="text-gray-500">Se acabaron los menus</p>
                        }
                        {error.menu && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"> {error.menu} </span>}
                    </div>
  
                      <div className="flex justify-content: flex-start flex-wrap">
                        {input.menu.map(el => <div key= {el+Math.random()} className= "mr-3 flex items-center bg-red-400 px-5 py-2 rounded-lg"><p>{el}</p><button onClick={() => handleDelete(el)} className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button></div>)}
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
  