import React from 'react'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'

const RightSide = () => {
  return (
    <div className='w-full h-full mr-16 lg:mr-[4.5rem] pl-5 lg:border-l border-gray-600 pt-5'>
      <div className="h-full flex flex-col gap-5">
        <div className="sticky top-5">
        <SearchBar />
        </div>
        <div className='bg-gray-700/30 rounded-xl p-5'>
          <p className='text-xl font-bold mb-2'>Changelog</p>
          <p className='text-gray-200 leading-tight mb-3'>If i was Elon Musk, i'll put some ads here, sell a premium subscribtion, and im gonna be richest dumb a** capitalist on earth.</p>
          <Button text="I Agree" addClass="bg-teal-400 text-white"/>
        </div>
        <div className='bg-gray-700/30 rounded-xl p-5'>
          <p className='text-xl font-bold mb-2'>Changelog</p>
          <p className='text-gray-200 leading-tight mb-3'>If i was Elon Musk, i'll put some ads here, sell a premium subscribtion, and im gonna be richest dumb a** capitalist on earth.</p>
          <Button text="I Agree" addClass="bg-teal-400 text-white"/>
        </div>
        <div className='bg-gray-700/30 rounded-xl p-5'>
          <p className='text-xl font-bold mb-2'>Changelog</p>
          <p className='text-gray-200 leading-tight mb-3'>If i was Elon Musk, i'll put some ads here, sell a premium subscribtion, and im gonna be richest dumb a** capitalist on earth.</p>
          <Button text="I Agree" addClass="bg-teal-400 text-white"/>
        </div>
      </div>
    </div>
  )
}

export default RightSide