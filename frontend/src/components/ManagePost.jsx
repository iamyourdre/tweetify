import React from 'react'
import { FaTrash } from 'react-icons/fa6';
import useCreatePost from '../hooks/useCreatePost';
import toast from 'react-hot-toast';

const ManagePost = ({id}) => {
  const { deletePost } = useCreatePost();
  const handleDeleteClick = async () => {
    toast.promise(
      deletePost(id),
      {
        loading: 'Deleting post...',
        success: window.location.href = '/',
        error: 'Something went wrong. Please try again.',
      }
    );
  };
  return (
    <>
      <button onClick={handleDeleteClick} className="gap-1 text-gray-500 hover:text-accent">
        <FaTrash className='text-xl inline' />
      </button>
    </>
  )
}

export default ManagePost