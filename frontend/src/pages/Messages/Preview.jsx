import React from 'react'
import { NavLink } from 'react-router-dom'

const Preview = ({preview}) => {
  
  return (
    <NavLink to="/" className='flex p-4 text-md hover:bg-base-300'>
      <img className='w-10 h-10' src={preview.profilePic}/>
      <div className="leading-tight pl-3 w-full">
        <div className="flex flex-wrap">
          <p className='flex-1 text-md font-bold overflow-hidden'>{preview.name}</p>
          <p className='flex-1 text-sm opacity-50 text-right'>{preview.time}</p>
        </div>
        <p className='text-sm opacity-50 line-clamp-1'>{preview.chat}</p>
      </div>
    </NavLink>
  )
}

export default Preview