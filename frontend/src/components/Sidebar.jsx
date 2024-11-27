import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClover } from "react-icons/fa6";
import { HiBell, HiChatBubbleOvalLeftEllipsis, HiMagnifyingGlass, HiMiniPencilSquare, HiMiniSquares2X2 } from "react-icons/hi2";

const Sidebar = () => {
  const links = [
    { to: "/", icon: <HiMiniSquares2X2 className="w-7 h-auto mx-auto" /> },
    { to: "/search", icon: <HiMagnifyingGlass className="w-7 h-auto mx-auto" /> },
    { to: "/notification", icon: <HiBell className="w-7 h-auto mx-auto" /> },
    { to: "/messages", icon: <HiChatBubbleOvalLeftEllipsis className="w-7 h-auto mx-auto" /> },
  ];  
  return (
    <div className="fixed z-50 bg-base-100 flex-none py-3 px-2 lg:px-3 h-screen flex flex-col border-r border-gray-600">
      <div className="flex-1 flex flex-col">
        <NavLink to="/" className="mb-8">
          <FaClover className='w-10 mt-0.5 h-auto mx-auto'/>
        </NavLink>

        <SideNavLink link={links[0]} />
        <SideNavLink link={links[1]} />
        <SideNavLink link={links[2]} />
        <SideNavLink link={links[3]} />
        
        <NavLink to="/" className="block btn btn-accent text-white p-2.5 rounded-full border-0 mt-3 hover:bg-opacity-50 transition-all">
          <HiMiniPencilSquare className='w-7 h-auto mx-auto'/>
        </NavLink>
        
      </div>
      <div className="flex-none">
        <NavLink to="/">
          <img className='w-11 h-auto mx-auto' src='https://avatar.iran.liara.run/public/34'/>
        </NavLink>
      </div>
    </div>
  )
}

const SideNavLink = ({link}) => {
  return (
    <div>
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `block hover:bg-gray-800 p-2.5 rounded-full border-0 bg-transparent mb-2 ${
            !isActive ? "text-gray-600" : ""
          }`
        }
      >
        {link.icon}
      </NavLink>
    </div>
  )
}

export default Sidebar