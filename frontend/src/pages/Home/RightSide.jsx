import React from 'react'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'

const RightSide = () => {
  return (
    <div className='w-full h-full pl-4 bg-base-100 lg:border-l border-gray-600 min-h-screen pt-5'>
      <div className="h-full flex flex-col gap-5 pb-5">
        <div className="sticky top-5">
        <SearchBar />
        </div>
        <div className='bg-gray-700/30 rounded-xl p-5 flex flex-col gap-3'>
          <p className='text-2xl font-bold mb-2'>Welcome to Tweetify</p>
          <p className='text-gray-200 leading-tight mb-3'>
            Tweetify is a social media platform where you can share your thoughts and ideas with the world. 
            You can also follow other users and see what they are up to.
          </p>
          <Button text="Let's Share An Idea" onClick={()=>document.getElementById('create_post_modal').showModal()}/>
        </div>
      </div>
    </div>
  )
}

export default RightSide