import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { postFood, getMenus, getFoods } from "../redux/actions";


function validate(input, findedName=""){
  const errors = {}
  if(!input.name){
    errors.name = 'Se requiere un nombre*'
  }
  if(findedName === true){
    errors.name = 'El nombre ya existe'
  }
  if(input.name.charAt(0) === " "){
    errors.name = 'No se permiten espacios al inicio*'
  }
  if(input.name.length > 30){
    errors.name = 'El nombre no puede superar los 30 caracteres*'
  }
  if(!input.price){
    errors.price = 'Se requiere un precio*'
  }
  if(input.price < 0){
    errors.price = 'El precio no puede ser negativo*'
  }
  if(!input.summary){
    errors.description = 'Se requiere una descripción*'
  }
  if(input.summary.length > 200){
    errors.description = 'La descripción no puede superar los 200 caracteres*'
  }
  if(input.summary.length < 10){
    errors.description = 'La descripción debe tener al menos 10 caracteres*'
  }
  if(!input.menu){
    errors.menu = 'Se requiere un menu*'
  }
  return errors
}





export default function CreateFoods() {
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
    if(foods.find((food) => food.name === name)){
      return true
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
    }, findedName));
  };

 


  const handleCheckboxChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(postFood({...input, photo: photo}));
    alert("Food created");
    navigate("/");
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
        <div className= "mt-20 mb-10" >
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div className="mt-5 md:col-span-2 md:mt-0 ml-4 ">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md ">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6 ">
                      <div className="col-span-3 sm:col-span-2 ">
                      <div className="col-span-6 sm:col-span-3 ">
          <div className="mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Crear Comida</h1>
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
                    {
                      Object.keys(error).length === 0 && photo.length > 0 ? <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button> : <button type="submit" disabled className="disabled:opacity-25 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>  
    )
  }
  