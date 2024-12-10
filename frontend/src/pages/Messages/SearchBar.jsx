import React from 'react'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { LuSearch } from 'react-icons/lu';

const SearchBar = ({ search, setSearch }) => {
  

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="rounded-3xl bg-gray-700 px-4 py-3">
      <div className="flex gap-3">
        {!search ? <LuSearch className='text-2xl' /> : <HiXMark onClick={() => setSearch('')} className='text-2xl' />}
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none"
          value={search} onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SearchBar