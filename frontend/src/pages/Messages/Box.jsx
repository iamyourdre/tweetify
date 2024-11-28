import React from 'react'
import Message from './Message'
import { HiChevronLeft } from "react-icons/hi2";
import Input from './Input';

const Box = () => {
  return (
    <div className='h-screen flex flex-col border-r border-gray-700'>
      <div className='w-full bg-base-100/80 backdrop-blur-md px-3 py-3.5 border-b border-gray-700 flex'>
        <label htmlFor="chat-drawer" className='flex justify-items-center items-center pr-4'>
          <HiChevronLeft className='text-2xl'/>
        </label>
        <img className='w-10 h-10' src={"https://avatar.iran.liara.run/public/22"}/>
        <div className="text-md leading-tight pl-3 w-full">
          <p className='flex-1 text-md font-bold overflow-hidden'>{"John Doe"}</p>
          <p className='flex-1 text-sm opacity-50'>{"Online"}</p>
        </div>
      </div>
      <div className="h-screen w-full overflow-auto relative p-5">
        <Message />
        <Message />
        <Message />
      </div>
      <Input />
    </div>
  )
}

export default Box