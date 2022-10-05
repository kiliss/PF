import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getRooms, postMessage, receiveMessages } from "../redux/actions";
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import jwtDecode from "jwt-decode";

const socket = io(process.env.REACT_APP_API, { transports: ["websocket"] });

export default function Chat() {
  const token = jwtDecode(localStorage.getItem("session"));
  const myName = localStorage.getItem("name");
  const idEmisor = token.id;
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(token.admin ? "" : token.id);
  const [photo, setPhoto] = useState(
    token.admin
      ? ""
      : "https://images.vexels.com/media/users/3/143047/isolated/preview/b0c9678466af11dd45a62163bdcf03fe-icono-plano-de-hamburguesa-de-comida-rapida.png"
  );
  const [name, setName] = useState(token.admin ? "" : "PFRestaurante");
  const dispatch = useDispatch();
  const rrooms = useSelector((state) => state.rooms);
  const messages = useSelector((state) => state.messages);
  //console.log(messages);

  useEffect(() => {
    if (token.admin) dispatch(getRooms());
    if (!token.admin) dispatch(getMessages(token.id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token.admin) {
      socket.on(`rooms`, () => {
        dispatch(getRooms());
      });
    }
    if (room) {
      socket.on(`room${room}`, (message, userId, room, user) => {
        if (token.id !== userId) dispatch(receiveMessages({ message, userId, room, user: { user } }));
      });

    }
    return () => {
      socket.off();
    };
    // eslint-disable-next-line
  }, [messages]);

  return (
    <div className="bg-gray-100 pt-20 pb-10">
      <div className="container mx-auto bg-white">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div className={`${room ? 'hidden' : 'block'} border-r border-gray-300 lg:col-span-1 lg:block`}>
            <ul className="h-[32rem] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full">
              {token.admin && Object.keys(rrooms).length ? (
                Object.keys(rrooms).map((r, index) => (
                  <li key={index}>
                    <div
                      onClick={() => {
                        dispatch(getMessages(rrooms[r][0].room));
                        setRoom(rrooms[r][0].room);
                        setPhoto(rrooms[r][rrooms[r].length - 1].user.photo);
                        setName(rrooms[r][rrooms[r].length - 1].user.user);
                      }}
                      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                    >
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={rrooms[r][rrooms[r].length - 1].user.photo}
                        alt="username"
                      />
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {rrooms[r][rrooms[r].length - 1].user.user}
                          </span>
                          <span className={`block ml-2 text-sm ${rrooms[r][0].user.admin ? 'text-green-500' : 'text-gray-600'}`}>
                            {rrooms[r][0].user.admin ? 'resuelto' : rrooms[r][0].date}
                          </span>
                        </div>
                        <span className="block ml-2 text-sm text-gray-600 break-all whitespace-pre-line">
                          {rrooms[r][0].message}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={token.admin ? "https://images.vexels.com/media/users/3/143047/isolated/preview/b0c9678466af11dd45a62163bdcf03fe-icono-plano-de-hamburguesa-de-comida-rapida.png" : photo}
                      alt="username"
                    />
                    <div className="w-full pb-2">
                      <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">
                          {token.admin ? 'No Hay Salas' : name}
                        </span>
                        <span className="block ml-2 text-sm text-gray-600"></span>
                      </div>
                      <span className="block ml-2 text-sm text-gray-600"></span>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className={`${room ? 'block' : 'hidden'} lg:col-span-2 lg:block`}>
            <div className="w-full">
              {room && (
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  {
                    token.admin ?
                      <div className="flex items-center cursor-pointer" onClick={() => { setRoom(''); }}>
                        <ArrowLeftIcon className="h-6 w-6" />
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={photo}
                          alt="username"
                        />
                      </div>
                      :
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={photo}
                        alt="username"
                      />
                  }
                  <span className="block ml-2 font-bold text-gray-600">
                    {name}
                  </span>
                </div>
              )}
              <div className="relative w-full p-6 h-[40rem] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full">
                <ul className="space-y-2">
                  {room && messages.map((mesagge, index) => (
                    <li
                      key={index}
                      className={
                        mesagge.userId !== idEmisor
                          ? "flex justify-start"
                          : "flex justify-end"
                      }
                    >
                      <div
                        className={
                          mesagge.userId !== idEmisor
                            ? "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"
                            : "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"
                        }
                      >
                        {
                          (mesagge.userId !== idEmisor || token.admin) && <span className="block text-right text-red-700 text-sm">{`~${token.admin ? mesagge.user.user : 'PFRestaurante'}`}</span>
                        }
                        <span className="block break-all whitespace-pre-line">{mesagge.message}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  maxLength='250'
                  placeholder={
                    !token.admin
                      ? "Escriba sus consultas..."
                      : room
                        ? "Responda al usuario..."
                        : "Elija una sala de chat..."
                  }
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                />

                {room && (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (message.length) {
                        dispatch(
                          postMessage({
                            message,
                            userId: idEmisor,
                            room: room ? room : 0,
                            user: myName
                          })
                        )
                        setMessage("");
                      }
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
