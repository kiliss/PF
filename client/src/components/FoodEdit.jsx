import { Fragment } from "react";
import React, { useState } from "react";
import { updateFood } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import swal from "sweetalert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function validate(comida, findedName = "", state, state2, food) {
  const errors = {};
  if (state2 === "validate2") {
    if (comida.name.length < 3 && comida.name.length !== 0) {
      errors.name = "El nombre debe tener al menos 3 caracteres*";
    }
    if (!comida.name && comida.name.length !== 0) {
      errors.name = "Se requiere un nombre*";
    }
    if (!comida.price && comida.price !== 0) {
      errors.price = "Se requiere un precio*";
    }
    if (!comida.description && comida.description !== "") {
      errors.description = "Se requiere una descripción*";
    }
    if (comida.description.length < 10 && comida.description.length !== 0) {
      errors.description = "La descripción debe tener al menos 10 caracteres*";
    }
  }
  if (state === "validate") {
    if (findedName === true && food.name !== comida.name) {
      errors.name = "El nombre ya existe";
    }
    if (comida.name.charAt(0) === " ") {
      errors.name = "No se permiten espacios al inicio*";
    }
    if (comida.name.length > 30) {
      errors.name = "El nombre no puede superar los 30 caracteres*";
    }
    if (comida.price < 0) {
      errors.price = "El precio no puede ser negativo*";
    }
    if (comida.description.length > 200) {
      errors.description =
        "La descripción no puede superar los 200 caracteres*";
    }
    if (comida.price > 999999) {
      errors.price = "El precio no puede superar los 6 digitos*";
    }
    if (comida.name.substr(-1) === " ") {
      errors.name = "No se permiten espacios al final*";
    }
  }
  return errors;
}

export default function Food(props) {
  const dispatch = useDispatch();
  let food = useSelector((state) => state.food);
  let foods = useSelector((state) => state.foods);

  const [comida, setComida] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [error, setError] = useState({});

  const findName = (name) => {
    if (foods.find((food) => food.name.toLowerCase() === name.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = function (e) {
    setComida({
      ...comida,
      [e.target.name]: e.target.value,
    });
    let findedName = findName(e.target.value);
    const nombre = food;
    setError(
      validate(
        {
          ...comida,
          [e.target.name]: e.target.value,
        },
        findedName,
        "validate",
        "validate3",
        nombre
      )
    );
  };

  const handleClick = function (
    e,
    id,
    name,
    price,
    summary,
    name2,
    price2,
    summary2
  ) {
    e.preventDefault();
    swal({
      title: "Quiere editar la comida?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let findedName = findName(name2);
        const aux = validate(comida, findedName, "validate4", "validate2");
        setError(aux);
        if (Object.keys(aux).length === 0) {
          dispatch(
            updateFood({
              id: id,
              name: name2 !== "" ? name2 : name,
              photo: photo === "" ? food.photo : photo,
              price: price2 !== 0 ? price2 : price,
              summary: summary2 !== "" ? summary2 : summary,
            })
          );
          swal("Comida editada", {
            icon: "success",
          }).then(() => {
            props.setOpen(false);
            window.location.reload(false);
          });
        } else {
          swal("Error al editar la comida", {
            icon: "error",
          });
        }
      } else {
        props.setOpen(false);
      }
    });
  };

  const [photo, setPhoto] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
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
    //console.log(photo)
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
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 lg:h-80">
                        {photo.length === 0 ? <img
                        src={food?.photo}
                        alt={comida?.name}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      /> : <img 
                      src={photo}
                      alt={comida?.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />}
                    </div>
                    <div className="absolute bottom-24 left-36 rounded-md border border-transparent bg-lime-600 sm:grid-cols-12 lg:gap-x-8">
                    <label
                            className="relative cursor-pointer rounded-md bg-lime-600 font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-green-800 focus-within:ring-offset-2 hover:bg-green-800 hover:text-white"
                          >
                            <span>Editar foto</span>
                            <input name="photo" type="file" value={comida.photo} onChange={uploadImage} className="sr-only" />
                          </label>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <input
                        type="text"
                        name="name"
                        placeholder={food.name}
                        className="text-2xl font-bold text-gray-900 sm:pr-1"
                        onChange={(e) => handleInputChange(e)}
                      />
                      {error.name && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {" "}
                          {error.name}{" "}
                        </span>
                      )}
                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <span className="text-2xl text-gray-900">$</span>
                        <input
                          type="number"
                          name="price"
                          placeholder={food?.price}
                          className="text-2xl text-gray-900"
                          onChange={(e) => handleInputChange(e)}
                        />
                        {error.price && (
                          <p className="font-medium tracking-wide text-red-500 text-xs mb-1 ml-1">
                            {" "}
                            {error.price}{" "}
                          </p>
                        )}

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    food?.stars > rating
                                      ? "text-gray-900"
                                      : "text-gray-300",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {food?.stars} out of 5 stars
                            </p>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-8"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Menus */}
                          <div>
                            <span className="flex items-center space-x-3 text-white mt-5">
                              {food?.menus?.map((menu, i) => {
                                return (
                                  <a
                                    className="bg-gray-900 p-1 rounded-lg text-xs font-medium"
                                    key={`food-menu-${menu.toLowerCase()}`}
                                    href={`/menu/${menu.toLowerCase()}`}
                                  >
                                    {menu}
                                  </a>
                                );
                              })}
                            </span>
                          </div>

                          {/* Categories */}
                          <div className="mt-8">
                            <h4 className="text-sm font-medium text-gray-900">
                              Categoría
                            </h4>

                            <span className="flex items-center space-x-3 text-gray-500 mt-4">
                              {food?.drinkable ? "Bebida" : "Comida"}{" "}
                              {food?.vegetarian ? "• Vegetariana" : ""}
                            </span>
                          </div>

                          {/* Description */}
                          <div className="mt-8">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Descripción
                              </h4>
                            </div>

                            <div>
                              <textarea
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="description"
                                placeholder={food?.summary}
                                onChange={(e) => handleInputChange(e)}
                              />
                              {error.description && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                  {" "}
                                  {error.description}{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </form>
                        <button
                          type="submit"
                          onClick={(e) =>
                            handleClick(
                              e,
                              food?.id,
                              food?.name,
                              food?.price,
                              food?.summary,
                              comida.name,
                              comida.price,
                              comida.description
                            )
                          }
                          className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
                        >
                          Save
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
