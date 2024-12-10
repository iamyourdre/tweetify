import React, { useEffect, useRef } from 'react'
import Bubble from './Bubble'
import useGetMessages from '../../../hooks/useGetMessages';
import useListenMessages from '../../../hooks/useListenMessages';
import useConversation from '../../../zustand/useConversation';

const Bubbles = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const { selectedConversation } = useConversation();
  const scrollRef = useRef();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, selectedConversation]);

  return (
    <>
      <div className="h-screen w-full overflow-auto relative p-3">
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
        {!loading && messages.length > 0 && messages.map((message) => (
          <div key={message._id}>
            <Bubble key={message._id} message={message} />
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
    </>
  )
}

export default Bubbles