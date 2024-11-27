import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import SearchResult from './SearchResult'

const SearchBar = () => {
  const searchResult = [
    { profilePic: "https://avatar.iran.liara.run/public/22", name: "John Doe", username: "@johndoe", following: false },
    { profilePic: "https://avatar.iran.liara.run/public/88", name: "Jane Doe", username: "@janedoe", following: true },
    { profilePic: "https://avatar.iran.liara.run/public/10", name: "John Smith", username: "@johnsmith", following: false },
  ];  
  return (
    <div>
      <div className="rounded-3xl bg-gray-700 px-4 py-3">
        <div className="flex gap-3">
          <HiMagnifyingGlass className='text-2xl'/>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none"
          />
        </div>
        <div className="border-t border-gray-500 mt-3">
          {searchResult.map((result, index) => (
            <SearchResult key={index} data={result}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar