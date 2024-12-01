import React from 'react'
import { NavLink } from 'react-router-dom'
import { extractTime } from '../../utils/extractTime';
import { useAuthContext } from '../../contexts/AuthContext';
import useConversations from '../../zustand/useConversation';
import { useSocketContext } from '../../contexts/SocketContext';

const Conversation = ({conversation}) => {
  const {user} = useAuthContext();
  const formattedTime = extractTime(conversation.updatedAt);
  const participant = conversation.participants.find(participant => participant._id !== user._id);
  const { profilePic, fullName, _id } = participant;

  const {selectedConversation, setSelectedConversation} = useConversations();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = (onlineUsers ?? []).includes(participant._id);

  return (
    <label htmlFor="chat-drawer" aria-label="close sidebar"className={
      `flex p-4 text-md hover:bg-base-300 ${isSelected ? 'bg-base-200' : ''}`
      }
      onClick={() => setSelectedConversation({_id: conversation._id, receiver:participant})}
    >
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className="w-10 h-10 rounded-full">
          <img src={profilePic} />
        </div>
      </div>
      <div className="leading-tight pl-3 w-full">
        <div className="flex flex-wrap">
          <p className='flex-1 text-md font-bold overflow-hidden'>{fullName}</p>
          <p className='flex-1 text-sm opacity-50 text-right'>{formattedTime}</p>
        </div>
        <p className='text-sm opacity-50 line-clamp-1'>{conversation.messages[0].message}</p>
      </div>
    </label>
  )
}

export default Conversation