import React from 'react'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Post = ({post}) => {
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  return (
    <Link className="flex w-full flex-col gap-3 border-b border-gray-600 pb-6 py-6 px-4 transition duration-200 ease-in-out hover:bg-base-200" to={`/p/${post._id}`} >
      <div className='flex text-md'>
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