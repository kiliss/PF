import { ChevronRightIcon } from "@heroicons/react/24/outline";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getRooms, postMessage } from "../redux/actions";
import jwtDecode from "jwt-decode";



// const socket = io("http://localhost:3001");

export default function Chat() {
  const token = jwtDecode(localStorage.getItem("session"));
  const idEmisor = token.id;
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(token.admin ? '' : token.id);
  const [photo, setPhoto] = useState(token.admin ? '' : 'https://images.vexels.com/media/users/3/143047/isolated/preview/b0c9678466af11dd45a62163bdcf03fe-icono-plano-de-hamburguesa-de-comida-rapida.png');
  const [name, setName] = useState(token.admin ? '' : 'PFRestaurante');
  const dispatch = useDispatch();
  const rrooms = useSelector((state) => state.rooms);
  const messages = useSelector((state) => state.messages);
  //console.log(messages);


  useEffect(() => {
    dispatch(getRooms());
    if (!token.admin) dispatch(getMessages(token.id));
    // dispatch(postMessage());
  }, []);

  const users = [
    {
      name: "Jhon Don",
      minutes: "25 Minutes",
      message: "bye",
      image:
        "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg",
    },
    {
      name: "Same",
      minutes: "50 minutes",
      message: "I am fine",
      image:
        "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg",
    },
    {
      name: "Emma",
      minutes: "1 hour",
      message: "Hi",
      image:
        "https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png",
    },
  ];

  const mesag = [
    {
      id: 1,
      user: 1,
      admin: false,
      message: "Hello",
    },
    {
      id: 2,
      user: 2,
      admin: true,
      message: "Hi",
    },
    {
      id: 3,
      user: 1,
      admin: false,
      message: "How are you?",
    },
    {
      id: 4,
      user: 2,
      admin: true,
      message: "I am fine",
    },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">

          <ul className="overflow-auto h-[32rem]">
            {token.admin ? rrooms.map((user, index) => (
              <li key={index}>
                <a onClick={() => { dispatch(getMessages(user.id)); setRoom(user.id); setPhoto(user.photo); setName(user.user) }} className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={user.photo}
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {user.user}
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                        {user.messages[user.messages.length - 1].date}
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">
                      {user.messages[user.messages.length - 1].message}
                    </span>
                  </div>
                </a>
              </li>
            ))
              :
              <li>
                <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={photo}
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {name}
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">

                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">

                    </span>
                  </div>
                </a>
              </li>
            }
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            {
              room && <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={photo}
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">{name}</span>
              </div>
            }
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {messages.map((mesagge, index) =>
                  <li key={index} className={mesagge.userId !== idEmisor ? "flex justify-start" : "flex justify-end"}>
                    <div className={mesagge.userId !== idEmisor ? "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow" : "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"}>
                      <span className="block">{mesagge.message}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder={!token.admin ? 'Escriba sus consultad...' : room ? 'Responda al usuario...' : 'Elija una sala de chat...'}
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />

              {
                room && <div
                  className='cursor-pointer'
                  onClick={() => {
                    dispatch(postMessage({
                      message,
                      userId: idEmisor,
                      room: room ? room : 0
                    }));
                    setMessage('');
                  }} >
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}