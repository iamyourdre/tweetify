import React from 'react'
import { FaEllipsisVertical, FaTrash } from "react-icons/fa6";
import useCreatePost from '../hooks/useCreatePost';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ManagePost = ({id}) => {
  const navigate = useNavigate();
  const { deletePost } = useCreatePost();
  const handleDeleteClick = async () => {
    toast.promise(
      deletePost(id),
      {
        loading: 'Deleting post...',
        success: navigate('/'),
        error: 'Something went wrong. Please try again.',
      }
    );
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <FaEllipsisVertical tabIndex={0} role="button"></FaEllipsisVertical>
        <ul tabIndex={0} className="dropdown-content menu bg-gray-700 rounded-xl z-[1] w-52 shadow p-0 mt-2">
          <li onClick={handleDeleteClick} className='text-red-500'>
            <a className='px-3 py-4 rounded-xl'><FaTrash/> Delete Post</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ManagePost