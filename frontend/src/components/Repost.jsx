import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { useRepostContext } from '../contexts/RepostContext';
import ManagePost from './ManagePost';

const Repost = ({ post }) => {
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  const { setRepostPost } = useRepostContext();

  const handlePostClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRepostClick = () => {
    setRepostPost(post);
    document.getElementById('repost_modal').showModal();
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <Link className='flex flex-col gap-3 pt-6 px-4 transition duration-200 ease-in-out hover:bg-base-200' to={`/p/${post._id}`}>
          <div className='flex text-md' id={post._id} onClick={handlePostClick}>
            <img className='w-10 h-10' src={post.author.profilePic} />
            <div className="leading-tight pl-3 w-full">
              <div className="flex">
                <p className='font-bold'>{post.author.fullName}</p>
              </div>
              <p className='text-sm opacity-50'>@{post.author.username + ' · ' + getRelativeTime}</p>
            </div>
          </div>
          <p className=''>{post.content}</p>
          <ImageGrid media={post.media} />
        </Link>
        <div className="px-4">
          <RepostedPost post={post.repostContent} />
        </div>
      </div>
      <div className={`flex gap-6 py-6 px-4`}>
        <Link className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center" to={`/p/${post._id}`} onClick={handlePostClick}>
          <FaComment className='text-xl inline' />0
        </Link>
        <button onClick={handleRepostClick} className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaShare className='text-xl inline' />0
        </button>
        <div className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaRegHeart className='text-xl inline' />0
        </div>
        <div className="flex-1 text-gray-500 hover:text-accent text-right">
          <ManagePost id={post._id}/>
        </div>
      </div>
    </>
  );
};

const ImageGrid = ({ media }) => {
  const baseURL = "http://localhost:5000"; // Ganti dengan URL backend Anda

  if (!media) { return null }
  if (media.length == 1) {
    return (
      <img src={`${baseURL}/${media[0]}`} className="rounded-2xl w-full" />
    )
  }
  if (media.length == 2) {
    return (
      <div className='grid grid-cols-2 gap-2'>
        {media.map((img, index) => (
          <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full" />
        ))}
      </div>
    )
  }
  if (media.length == 3) {
    return (
      <div className='grid grid-cols-2 gap-2'>
        {media.map((img, index) => (
          <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full" />
        ))}
      </div>
    )
  }
  if (media.length == 4) {
    return (
      <div className='grid grid-cols-2 gap-2'>
        {media.map((img, index) => (
          <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full" />
        ))}
      </div>
    )
  }
}

const RepostedPost = ({ post }) => {
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  const handlePostClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Link className='border p-3 border-gray-600 flex transition duration-200 ease-in-out hover:bg-base-200 rounded-lg' to={`/p/${post._id}`} onClick={handlePostClick}>
      <div className='flex flex-col gap-3'>
        <div className='flex text-md' id={post._id} onClick={handlePostClick}>
          <img className='w-10 h-10' src={post.author.profilePic} />
          <div className="leading-tight pl-3 w-full">
            <div className="flex">
              <p className='font-bold'>{post.author.fullName}</p>
            </div>
            <p className='text-sm opacity-50'>@{post.author.username + ' · ' + getRelativeTime}</p>
          </div>
        </div>
        <p className=''>{post.content}</p>
        <ImageGrid media={post.media} />
      </div>
    </Link>
  );
};

export default Repost;