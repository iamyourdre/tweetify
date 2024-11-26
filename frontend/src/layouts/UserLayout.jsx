import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar'

const UserLayout = () => {
  return (
    <div className="flex lg:px-24 relative">
      <Sidebar />
      <div className="flex-auto ml-16 lg:ml-20">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout