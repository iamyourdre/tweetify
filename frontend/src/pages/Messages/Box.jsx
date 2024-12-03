import React, { useEffect, useState } from 'react'
import Bubble from './Bubble'
import { HiChevronLeft } from "react-icons/hi2";
import Input from './Input';
import useConversations from '../../zustand/useConversation';
import Bubbles from './Bubbles';
import { useSocketContext } from '../../contexts/SocketContext';

const Box = () => {
  const {selectedConversation, setSelectedConversation} = useConversations();
  const {onlineUsers} = useSocketContext();
  const isOnline = (onlineUsers ?? []).includes(selectedConversation?.receiver._id);

  useEffect(() => {
    const chatDrawer = document.getElementById('chat-drawer');
    if (chatDrawer) {
      if (!chatDrawer.checked) {
        chatDrawer.checked = true;
      }
    }
    return () => {
      setSelectedConversation(null);
    }
  }, [setSelectedConversation]);

  return (
    <>
      <div className='h-screen flex flex-col border-r border-gray-700'>
        {!selectedConversation ? (
            <div className='flex justify-center items-center h-screen'>
              <label htmlFor="chat-drawer" className='flex justify-items-center items-center pr-4 gap-2'>
                <HiChevronLeft className='text-2xl'/>
                <div className='text-xl lg:text-2xl'>Select a chat to start messaging</div>
              </label>
            </div>
          ) :
          (
            <>
              <div className='w-full bg-base-100/80 backdrop-blur-md px-3 py-3.5 border-b border-gray-700 flex'>
                <label htmlFor="chat-drawer" className='flex justify-items-center items-center pr-4 lg:hidden'>
                  <HiChevronLeft className='text-2xl'/>
                </label>
                
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                  <div className="w-10 h-10 rounded-full">
                    <img src={selectedConversation.receiver.profilePic}/>
                  </div>
                </div>
                <div className="text-md leading-tight pl-3 w-full">
                  <p className='flex-1 text-md font-bold overflow-hidden'>{selectedConversation.receiver.fullName}</p>
                  <p className='flex-1 text-sm opacity-50'>@{selectedConversation.receiver.username}</p>
                </div>
              </div>
              <Bubbles/>
              <Input /> 
            </>
          )
        }
      </div> 
    </>
  )
}

export default Box