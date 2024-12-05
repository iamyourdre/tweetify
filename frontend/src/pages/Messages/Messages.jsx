import React from 'react'
import Conversation from './Conversation'
import Box from './MessageBox/Box'
import SearchBar from './SearchBar';
import useGetConversations from '../../hooks/useGetConversations';
import { HiMiniPlus } from 'react-icons/hi2';
import Modal from './NewChat/Modal';

const Messages = () => {
  const {loading, conversations} = useGetConversations();
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
          <div className="menu h-full lg:w-80 w-full bg-base-100 p-0 m-0 relative">
            <div className="h-full flex flex-col">
              <div className='w-full bg-base-100 px-4 py-5 z-10 border-b border-gray-700'>
                <p className='text-xl font-bold'>Messages</p>
              </div>
              <div className='h-screen flex flex-col overflow-auto'>
                <div className="p-4">
                  <SearchBar />
                </div>
                
                {loading && 
                  <div className='h-full'>
                    <div className="flex justify-center items-center h-full">
                      <span className="loading loading-dots loading-lg text-emerald-400"></span>
                    </div>
                  </div>
                }
                {!loading && !conversations.length && 
                  <div className='h-full'>
                    <div className="flex justify-center items-center h-full">
                      <div className='text-2xl text-gray-400'>No messages yet</div>
                    </div>
                  </div>
                }
                {!loading && conversations.length > 0 && conversations.map((conversation) => (
                  <Conversation key={conversation._id} conversation={conversation} />
                ))}
              </div>
            </div>
            <button to="/" className="bg-accent text-white px-3 py-3 rounded-full border-0 mt-3 hover:bg-opacity-50 transition-all absolute bottom-5 right-5" onClick={()=>document.getElementById('new_chat_modal').showModal()}>
              <HiMiniPlus className='w-6 h-6 mx-auto'/>
            </button>
          </div>
          <Modal/>
        </div>
      </div>
    </>
  )
}

export default Messages