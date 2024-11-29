import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClover } from "react-icons/fa6";
import { HiBell, HiChatBubbleOvalLeftEllipsis, HiMagnifyingGlass, HiMiniPencilSquare, HiMiniSquares2X2 } from "react-icons/hi2";
import {useAuthContext} from '../contexts/AuthContext';

const Sidebar = () => {
  const {user} = useAuthContext();
  const links = [
    { to: "/", icon: <HiMiniSquares2X2 className="w-7 h-auto mx-auto" /> },
    { to: "/search", icon: <HiMagnifyingGlass className="w-7 h-auto mx-auto" /> },
    { to: "/notification", icon: <HiBell className="w-7 h-auto mx-auto" /> },
    { to: "/messages", icon: <HiChatBubbleOvalLeftEllipsis className="w-7 h-auto mx-auto" /> },
  ];  
  return (
    <div className="fixed z-50 flex-none py-3 px-2 lg:px-3 h-full flex flex-col border-r border-gray-600 bg-base-100">
      <NavLink to="/" className="mb-8">
        <FaClover className='w-10 mt-0.5 h-auto mx-auto'/>
      </NavLink>

      <SideNavLink link={links[0]} />
      <SideNavLink link={links[1]} />
      <SideNavLink link={links[2]} />
      <SideNavLink link={links[3]} />

      <NavLink to="/" className="bg-accent text-white px-1.5 py-3 rounded-full border-0 mt-3 hover:bg-opacity-50 transition-all">
        <HiMiniPencilSquare className='w-6 h-6 mx-auto'/>
      </NavLink>
      <NavLink to="/" className="mt-5">
        <img className='w-6 mt-3 h-auto mx-auto' src={user.profilePic}/>
      </NavLink>
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