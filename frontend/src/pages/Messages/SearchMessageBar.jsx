import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const SearchMessageBar = () => {
  return (
    <div className="rounded-3xl bg-gray-700 px-4 py-3">
      <div className="flex gap-3">
        <HiMagnifyingGlass className='text-2xl'/>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none"
        />
      </div>
    </div>
  )
}

export default SearchMessageBar