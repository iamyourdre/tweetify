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
    return () => {
      setSelectedConversation(null);
    }
  }, [setSelectedConversation]);


  const messages = [
    {isMe: true, text: "Test!", time: "00:46", seen: true},
    {isMe: false, profilePic: "https://avatar.iran.liara.run/public/22", name: "John Doe", text: "Nice!", time: "01:00"},
    {isMe: false, profilePic: "https://avatar.iran.liara.run/public/22", image: 'https://images.unsplash.com/photo-1732130318659-03b9445dc29b', name: "John Doe", text: "Look!", time: "01:01"},
    {isMe: true, text: "Good!", image:"https://images.unsplash.com/photo-1732130318734-fa3f78202a6f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", time: "00:46", seen: true},
  ]
  return (
    <>
      <div className='h-screen flex flex-col border-r border-gray-700'>
        {!selectedConversation ? (
            <div className='flex justify-center items-center h-screen'>
              <div className='text-2xl'>Select a chat to start messaging</div>
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