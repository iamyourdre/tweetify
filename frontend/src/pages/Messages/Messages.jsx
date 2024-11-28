import React from 'react'
import Preview from './Preview'
import Box from './Box'
import SearchBar from './SearchBar';

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
      <div className="drawer lg:drawer-open ">
        <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Box />
        </div>
        <div className="drawer-side border-r border-gray-700 pl-16 lg:p-0">
          <label htmlFor="chat-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu h-full lg:w-80 w-full bg-base-100 p-0 m-0">
            <div className="h-full flex flex-col">
              <div className='w-full bg-base-100 px-4 py-5 z-10 border-b border-gray-700'>
                <p className='text-xl font-bold'>Messages</p>
              </div>
              <div className='h-screen flex flex-col overflow-auto'>
                <div className="p-4">
                  <SearchBar />
                </div>
                {messagePreview.map((preview, index) => (
                  <Preview key={index} preview={preview} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messages