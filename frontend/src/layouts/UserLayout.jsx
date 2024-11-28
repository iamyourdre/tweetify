import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar'

const UserLayout = () => {
  return (
    <div className="flex lg:mx-24 relative ">
      <Sidebar />
      <div className="flex-auto pl-16 lg:px-[4.5rem] ">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout