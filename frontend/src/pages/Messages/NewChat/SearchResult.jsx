import React, { useEffect } from 'react'
import useCreateConversations from '../../../hooks/useCreateConversations';
import useConversations from '../../../zustand/useConversation';
import { useAuthContext } from '../../../contexts/AuthContext';

const SearchResult = ({data}) => {

  const {user} = useAuthContext();
  const { loading, conversations, createConversations } = useCreateConversations();
  const {selectedConversation, setSelectedConversation} = useConversations();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const conversation = await createConversations(data._id);
      const participant = conversation.participants.find(participant => participant._id !== user._id);
      setSelectedConversation({_id: conversation._id, receiver: participant, profilePic: participant.profilePic});
    } catch (error) {
      console.error("Failed to create conversation", error);
    }
  }

  return (
    <form method="dialog" className='flex text-md w-full' onClick={handleClick}>
      <button className='flex-auto flex text-md py-2'>
        <img className='w-10 h-10' src={data.profilePic}/>
        <div className="leading-tight pl-3 w-full">
          <div className="flex">
            <p className='text-md font-bold'>{data.fullName}</p>
            {/* <div className='flex-1 text-sm opacity-50 text-right '>
              <div className="badge badge-neutral">Following</div>
            </div> */}
          </div>
          <p className='text-sm opacity-50 text-left'>@{data.username}</p>
        </div>
      </button>
    </form>
  )
}

export default SearchResult