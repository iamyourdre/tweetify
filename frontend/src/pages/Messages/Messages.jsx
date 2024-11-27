import React from 'react'
import Preview from './Preview'
import Box from './Box'
import SearchMessageBar from './SearchMessageBar';

const Messages = () => {
  
  const messagePreview = [
    { profilePic: "https://avatar.iran.liara.run/public/22", name: "John Doe", chat: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus provident totam quibusdam facilis autem saepe ex dolore non, itaque dignissimos illo?", time: "3:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/88", name: "Jane Doe", chat: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquid autem molestiae eos numquam incidunt.", time: "2:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/10", name: "John Smith", chat: "Lorem, ipsum dolor.", time: "1:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/22", name: "John Doe", chat: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus provident totam quibusdam facilis autem saepe ex dolore non, itaque dignissimos illo?", time: "3:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/88", name: "Jane Doe", chat: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquid autem molestiae eos numquam incidunt.", time: "2:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/10", name: "John Smith", chat: "Lorem, ipsum dolor.", time: "1:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/22", name: "John Doe", chat: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus provident totam quibusdam facilis autem saepe ex dolore non, itaque dignissimos illo?", time: "3:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/88", name: "Jane Doe", chat: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquid autem molestiae eos numquam incidunt.", time: "2:00 PM" },
    { profilePic: "https://avatar.iran.liara.run/public/10", name: "John Smith", chat: "Lorem, ipsum dolor.", time: "1:00 PM" },
  ]; 
  return (
    <>
      <div className='grid lg:grid-cols-8 h-screen'>
        <div className="lg:col-span-3 relative overflow-auto">
          <div className='fixed w-full bg-base-100/80 backdrop-blur-md px-4 py-5'>
            <p className='text-xl font-bold'>Messages</p>
          </div>
          <div className='pt-[4.3rem] h-screen flex flex-col'>
            <div className="border-t border-gray-600">
              <div className="p-4">
                <SearchMessageBar />
              </div>
              {messagePreview.map((preview, index) => (
                <Preview key={index} preview={preview} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 hidden z-50 lg:flex flex-col gap-4">
          <Box />
        </div>
      </div>
    </>
  )
}

export default Messages