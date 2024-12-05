import React from 'react'
import { HiXMark } from 'react-icons/hi2'
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="rounded-3xl bg-gray-700 px-4 py-3">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent focus:outline-none"
          value={search} onChange={handleChange}
        />
        {!search ? <LuSearch className='text-2xl' /> : <HiXMark onClick={() => setSearch('')} className='text-2xl' />}
      </div>
    </div>
  )
}

export default SearchBar