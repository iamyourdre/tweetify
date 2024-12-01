import React from 'react'

const Bubble = ({message}) => {
  return (
    <div className='flex flex-col gap-2'>
      {message.isMe ? (
        <div className="chat chat-end">
          {message.image ? (
            <>
              <div className="chat-bubble p-0 w-full bg-teal-500 text-white">
                <img src={message.image} className='rounded-t-2xl' />
                <div className='px-4 py-2'>
                  {message.text ? <p>{message.text}</p> : ''}
                  <time className="text-xs opacity-50 ">{message.time}</time>
                </div>
              </div>
            </>
          ):(
            <>
              <div className="chat-bubble bg-teal-500 text-white">
                {message.text ? <p>{message.text}</p> : ''}
                <time className="text-xs opacity-50 ">{message.time} • {message.seen?"Seen":"Delivered"}</time>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-7 rounded-full">
              <img src={message.profilePic} />
            </div>
          </div>
          {message.image ? (
            <>
              <div className="chat-bubble p-0 w-full bg-gray-700 text-gray-200">
                <img src={message.image} className='rounded-t-2xl' />
                <div className='px-4 py-2'>
                  {message.text ? <p>{message.text}</p> : ''}
                  <time className="text-xs opacity-50 ">{message.time}</time>
                </div>
              </div>
            </>
          ):(
            
            <>
              <div className="chat-bubble bg-gray-700 text-gray-200">
                {message.text ? <p>{message.text}</p> : ''}
                <time className="text-xs opacity-50 ">{message.time}</time>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Bubble