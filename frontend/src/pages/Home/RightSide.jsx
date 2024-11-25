import React from 'react'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'

const RightSide = () => {
  return (
    <div className='absolute w-full mr-16 lg:mr-[4.5rem] flex flex-col gap-4'>
      <SearchBar />
      <div className='border border-gray-600 rounded-xl p-4'>
        <p className='text-xl font-bold mb-2'>Changelog</p>
        <p className='text-gray-200 leading-tight mb-3'>If i was Elon Musk, i'll put some ads here, sell a premium subscribtion, and im gonna be richest dumb a** capitalist on earth.</p>
        <Button text="I Agree" addClass="bg-teal-400 text-white"/>
      </div>
    </div>
  )
}

export default RightSide