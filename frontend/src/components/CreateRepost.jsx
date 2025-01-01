import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useRepostContext } from '../contexts/RepostContext';
import Button from './Button';
import { HiXMark } from 'react-icons/hi2';
import Post from './Post';
import toast from 'react-hot-toast';
import useCreatePost from '../hooks/useCreatePost';
import { NavLink } from 'react-router-dom';
import { set } from 'date-fns';

const CreateRepost = () => {
  const { user } = useAuthContext();
  const { repostPost, setRepostPost } = useRepostContext();
  const { createRepost } = useCreatePost();
  const [caption, setCaption] = useState('');

  const handlePost = () => {
    document.getElementById('repost_modal').close();
    toast.promise(
      createRepost({ caption, _id: repostPost._id }),
      {
        loading: 'Posting...',
        success: (data) => (
          <div>
            Post created!&nbsp;
            <NavLink to={`/p/${data._id}`} className="underline font-bold">View post</NavLink>
          </div>
        ),
        error: (err) => `Failed to create post: ${err}`
      }
    );
    setCaption('');
    setRepostPost(null);
  }

  return (
    <dialog id="repost_modal" className="modal max-h-screen">
      <div className="modal-box max-w-xl top-10 my-0 flex flex-col p-0">
        <div className="p-4 border-b border-gray-600">
          <div className="text-lg font-semibold text-center">Repost A Content</div>
          <HiXMark onClick={() => document.getElementById('repost_modal').close()} className='text-xl cursor-pointer absolute top-0 left-0 my-5 mx-4'/>
        </div>
        <div className="flex flex-col overflow-auto p-4 gap-4">
          <div className="flex gap-4">
            <div className="relative">
              <img className='w-10 h-10 border border-gray-700 rounded-full' src={user.profilePic} />
            </div>
            <div className="flex flex-col flex-1">
              <div className='relative'>
                <textarea
                  className="textarea textarea-lg p-0 rounded-none border-0 focus:outline-none flex-1 leading-none overflow-auto mt-2 resize-none w-full"
                  placeholder="Add caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          {repostPost && (
            <div className='border-t border-gray-600'>
              <Post post={repostPost} showFooter={false}/>
            </div>
          )}
        </div>
        <div className="border-t border-gray-600 p-4 flex">
          <div className="flex-1 text-right">
            <Button text={'Repost'} onClick={handlePost} />
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-white bg-opacity-20">
        <button></button>
      </form>
    </dialog>
  )
}

export default CreateRepost;