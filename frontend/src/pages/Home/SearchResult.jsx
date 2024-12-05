import React from 'react'
import { NavLink } from 'react-router-dom'

const SearchResult = ({data}) => {
  return (
    <NavLink to="/" className='flex mt-4 text-md'>
      <img className='w-10 h-10' src={data.profilePic}/>
      <div className="leading-tight pl-3 w-full">
        <div className="flex">
          <p className='text-md font-bold'>{data.name}</p>
          {/* <div className='flex-1 text-sm opacity-50 text-right '>
            <div className="badge badge-neutral">Following</div>
          </div> */}
        </div>
        <p className='text-sm opacity-50'>{data.username}</p>
      </div>
    </NavLink>
  )
}

export default SearchResult