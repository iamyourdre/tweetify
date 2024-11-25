import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const SearchBar = () => {
  return (
    <div>
      <div className="rounded-badge bg-gray-700 font-medium flex px-4 py-3 gap-2">
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

export default SearchBar