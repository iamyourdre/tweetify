import React from 'react'
import Conversation from './Conversation'
import Box from './Box'
import SearchBar from './SearchBar';
import useGetConversations from '../../hooks/useGetConversations';

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
          <div className="menu h-full lg:w-80 w-full bg-base-100 p-0 m-0">
            <div className="h-full flex flex-col">
              <div className='w-full bg-base-100 px-4 py-5 z-10 border-b border-gray-700'>
                <p className='text-xl font-bold'>Messages</p>
              </div>
              <div className='h-screen flex flex-col overflow-auto'>
                <div className="p-4">
                  <SearchBar />
                </div>
                {conversations.map((conversation, index) => (
                  <Conversation key={index} conversation={conversation} />
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