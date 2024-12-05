import React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext';
import useConversation from '../../../zustand/useConversation';
import { extractTime } from '../../../utils/extractTime';

const Bubble = ({message}) => {
  const {user} = useAuthContext();
  const {selectedConversation} = useConversation();
  const isMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  console.log(message)
  return (
    <div className='flex flex-col gap-2'>
      {isMe ? (
        <div className="chat chat-end">
          {message.image ? (
            <>
              <div className="chat-bubble p-0 w-full bg-teal-500 text-white">
                <img src={message.image} className='rounded-t-2xl' />
                <div className='px-4 py-2'>
                  {message.message ? <p>{message.message}</p> : ''}
                  <time className="text-xs opacity-50 ">{formattedTime}</time>
                </div>
              </div>
            </>
          ):(
            <>
              <div className="chat-bubble bg-teal-500 text-white">
                {message.message ? <p>{message.message}</p> : ''}
                <time className="text-xs opacity-50 ">{formattedTime}</time>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="chat chat-start">
          {message.image ? (
            <>
              <div className="chat-bubble p-0 w-full bg-gray-700 text-gray-200">
                <img src={message.image} className='rounded-t-2xl' />
                <div className='px-4 py-2'>
                  {message.message ? <p>{message.message}</p> : ''}
                  <time className="text-xs opacity-50 ">{formattedTime}</time>
                </div>
              </div>
            </>
          ):(
            
            <>
              <div className="chat-bubble bg-gray-700 text-gray-200">
                {message.message ? <p>{message.message}</p> : ''}
                <time className="text-xs opacity-50 ">{formattedTime}</time>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Bubble