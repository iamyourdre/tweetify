import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";

const Post = ({post}) => {
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });

  const handlePostClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link className="flex w-full flex-col gap-3 border-b border-gray-600 py-6 px-4 transition duration-200 ease-in-out hover:bg-base-200" to={`/p/${post._id}`} onClick={handlePostClick}>
      <div className='flex text-md' id={post._id}>
        <img className='w-10 h-10' src={post.author.profilePic}/>
        <div className="leading-tight pl-3 w-full">
          <div className="flex">
            <p className='font-bold'>{post.author.fullName}</p>
            {/* <div className='flex-1 text-sm opacity-50 text-right '>
              <div className="badge badge-neutral">Following</div>
            </div> */}
          </div>
          <p className='text-sm opacity-50'>@{post.author.username +' · '+getRelativeTime}</p>
        </div>
      </div>
      <p className=''>{post.content}</p>
      <ImageGrid media={post.media}/>
      <div className="flex flex-1 mt-2 gap-8">
        <Link className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center" to={`/p/${post._id}`} onClick={handlePostClick}>
          <FaComment className='text-xl inline' />0
        </Link>
        <div className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaShare className='text-xl inline' />0
        </div>
        <div className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaRegHeart className='text-xl inline' />0
        </div>
      </div>
    </Link >
  )
}

const ImageGrid = ({media}) => {
  const baseURL = "http://localhost:5000"; // Ganti dengan URL backend Anda

  if (!media) {return null}
  if (media.length == 1) {return (
    <img src={`${baseURL}/${media[0]}`} className="rounded-2xl w-full"/>
  )}
  if (media.length == 2) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img, index) => (
        <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
  if (media.length == 3) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img, index) => (
        <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
  if (media.length == 4) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img, index) => (
        <img key={index} src={`${baseURL}/${img}`} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
}

export default Post