import React from 'react'

const Message = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className="chat chat-end">
        <div className="chat-bubble bg-accent text-white">
          <p>Ay yo John!</p>
          <p className='text-right'>
            <time className="text-xs opacity-50 ">00:46 • Seen</time>
          </p>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-7 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://avatar.iran.liara.run/public/22" />
          </div>
        </div>
        <div className="chat-bubble bg-gray-700 text-gray-200">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus provident totam quibusdam facilis autem saepe ex dolore non, itaque dignissimos illo?</p>
          <time className="text-xs opacity-50">00:46 • Seen</time>
        </div>
      </div>
    </div>
  )
}

export default Message