import { ChevronRightIcon } from "@heroicons/react/24/outline";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, getRooms, postMessage } from "../redux/actions";
import jwtDecode from "jwt-decode";



// const socket = io("http://localhost:3001");

export default function Chat() {
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const [ receptorId, setReceptorId ] = useState("");
  const dispatch = useDispatch();
  const rrooms = useSelector((state) => state.rooms);
  const messages = useSelector((state) => state.messages);
console.log(messages);


  useEffect(() => {
    dispatch(getRooms());
    // dispatch(postMessage());
}, []);
  

const token = jwtDecode(localStorage.getItem("session"));
const idEmisor = token.id;


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

  const mesag= [
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
    <div className="container mx-auto my-20">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {rrooms.map((user, index) => (
              <li key={index}>
                <a onClick={() => {dispatch(getMessages(user.id)); setReceptorId(user.id) }} className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={user.photo}
                    alt="username"
                  />
                  <div  className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {user.name}
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
            ))}
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">Same</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {messages.map((mesagge, index) =>
                    <li key={index} className={mesagge.users[0].admin === false ? "flex justify-start" : "flex justify-end"}>
                      <div className={mesagge.users[0].admin === false ? "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow": "relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"}>
                        <span className="block">{mesagge.message}</span>
                      </div>
                    </li>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />

              <div onClick={() => dispatch(postMessage({
                message,
                receptorId,
                userId: idEmisor,
              }))} >
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}