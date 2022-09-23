import { Fragment } from 'react';
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { giveFoodValoration, getFood } from "../../redux/actions";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Food(props) {
    const dispatch = useDispatch();
    const food = useSelector((state) => state.food);
    const [selectedStar, setSelectedStar] = useState(0);

    const { admin, id: userId } = localStorage.getItem('user') ? jwt_decode(localStorage.getItem('user')) : { 'admin': false, 'id': 0 };

    const notify = (msg) => toast.success(msg, {
        closeButton: false // or MyCustomCloseButton
      });

    const sendValoration = async (stars) => {
        const message = await dispatch(giveFoodValoration(food.id, userId, stars));
        notify(message);
        dispatch(getFood(food.id));
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
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
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
                                            <img src={food?.photo} alt={food?.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{food?.name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <p className="text-2xl text-gray-900">${food?.price}</p>

                                                {/* Reviews */}
                                                <div className="mt-6">
                                                    <h4 className="sr-only text-red-900">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                                <StarIcon
                                                                    key={rating}
                                                                    className={classNames(
                                                                        selectedStar > rating ? 'text-red-900 cursor-pointer' :
                                                                            selectedStar !== 0 ? 'text-gray-300' :
                                                                                food?.stars > rating || !food.stars ? 'text-gray-900' : 'text-gray-300',
                                                                        'h-5 w-5 flex-shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                    onMouseOver={() => userId && !admin && setSelectedStar(rating + 1)}
                                                                    onMouseLeave={() => userId && !admin && setSelectedStar(0)}
                                                                    onClick={() => userId && !admin && sendValoration(rating + 1)} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-8">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <form>
                                                    {/* Menus */}
                                                    <div>

                                                        <span className="flex items-center space-x-3 text-white mt-5">
                                                            {food?.menus?.map((menu, i) => {
                                                                return <a className='bg-gray-900 p-1 rounded-lg text-xs font-medium' key={`food-menu-${menu.toLowerCase()}`} href={`/menu/${menu.toLowerCase()}`}>{menu}</a>;
                                                            })}
                                                        </span>
                                                    </div>

                                                    {/* Categories */}
                                                    <div className="mt-8">
                                                        <h4 className="text-sm font-medium text-gray-900">Categoría</h4>

                                                        <span className="flex items-center space-x-3 text-gray-500 mt-4">
                                                            {food?.drinkable ? 'Bebida' : 'Comida'} {food?.vegetarian ? '• Vegetariana' : ''}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="mt-8">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium text-gray-900">Descripción</h4>
                                                        </div>

                                                        <div className="flex text-gray-500 mt-4">
                                                            {food?.summary}
                                                        </div>
                                                    </div>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                <ToastContainer position="bottom-right" autoClose={5000} pauseOnHover={false} draggable={false} closeOnClick={false} rtl={false}/>
            </Dialog>
        </Transition.Root>
    )
}
