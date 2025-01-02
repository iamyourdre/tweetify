import React from 'react'
import SearchBar from '../../components/SearchBar'

const Search = () => {
  return (
    <div className='min-h-screen flex flex-col border-r border-gray-600 p-5'>
      <div className="font-medium text-3xl min-h-56 flex items-end pb-6 justify-center">Let's Find Someone</div>
      <div className="flex lg:mx-36">
        <SearchBar />
      </div>
    </div>
  )
}

export default Search