import React, { useEffect, useRef } from 'react'
import Bubble from './Bubble'
import useGetMessages from '../../../hooks/useGetMessages';
import useListenMessages from '../../../hooks/useListenMessages';

const Bubbles = () => {
  const {messages, loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  
  useEffect (() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  },[messages]);

  return (
    <>
      <div className="h-screen w-full overflow-auto relative p-3" >
        {loading && 
          <div className='h-full'>
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-lg text-emerald-400"></span>
            </div>
          </div>
        }
        {!loading && !messages.length && 
          <div className='h-full'>
            <div className="flex justify-center items-center h-full">
              <div className='text-2xl text-gray-400'>Let's start a conversation</div>
            </div>
          </div>
        }
        {!loading && messages.length > 0 && messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Bubble key={message._id} message={message} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Bubbles