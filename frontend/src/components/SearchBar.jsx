import React, { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import SearchResult from './SearchResult'
import useGetUsers from '../hooks/useGetUsers'
import Loading from './Loading'

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { loading, users } = useGetUsers(query);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9._']/g, '');
    setQuery(filteredValue);
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <div className='w-full'>
      <div className="rounded-3xl bg-gray-700 px-4 py-3">
        <div className="flex gap-3 items-center">
          <HiMagnifyingGlass className='text-2xl'/>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none flex-1"
            value={query}
            onChange={handleInputChange}
          />
          {query && <IoClose className='text-2xl cursor-pointer' onClick={clearQuery}/>}
        </div>
        {query && (
          <div className="">
            {loading ? (
              <Loading />
            ) : (
              users.map((user, index) => (
                <SearchResult key={index} data={user}/>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar