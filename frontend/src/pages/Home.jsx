import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClover } from "react-icons/fa6";
import { HiBell, HiChatBubbleOvalLeftEllipsis, HiMagnifyingGlass, HiMiniPencilSquare, HiMiniSquares2X2 } from "react-icons/hi2";

const Home = () => {

  const navLinks = [
    { to: "/", icon: <HiMiniSquares2X2 className="w-7 h-auto mx-auto" /> },
    { to: "/search", icon: <HiMagnifyingGlass className="w-7 h-auto mx-auto" /> },
    { to: "/notification", icon: <HiBell className="w-7 h-auto mx-auto" /> },
    { to: "/message", icon: <HiChatBubbleOvalLeftEllipsis className="w-7 h-auto mx-auto" /> },
  ];  

  return (
    <div className="flex">
      <div className="flex-none py-4 px-3 border-r border-slate-700 h-screen flex flex-col">
        <div className="flex-1 flex flex-col gap-1">
          <NavLink to="/" className="mb-8">
            <FaClover className='w-8 h-auto mx-auto'/>
          </NavLink>

          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `block hover:bg-neutral-900 p-2.5 rounded-full border-0 bg-transparent ${
                  isActive ? "" : "text-neutral-600"
                }`
              }
            >
              {link.icon}
            </NavLink>
          ))}
          
          <NavLink to="/" className="block bg-teal-500 p-2.5 rounded-full border-0 bg-transparent mt-3 hover:bg-teal-700 transition-all">
            <HiMiniPencilSquare className='w-7 h-auto mx-auto'/>
          </NavLink>
          
        </div>
        <div className="flex-none">
          <NavLink to="/">
            <img className='w-11 h-auto mx-auto' src='https://avatar.iran.liara.run/public/34'/>
          </NavLink>
        </div>
      </div>
      <div className="flex-auto">
        2
      </div>
    </div>
  )
}

export default Home