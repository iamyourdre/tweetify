import React from 'react'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Post = ({post}) => {
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  return (
    <Link className="flex w-full flex-col gap-3 border-b border-gray-600 pb-6 mb-6 px-4 transition duration-200 ease-in-out hover:bg-base-200" to={`/p/${post._id}`} >
      <div className='flex mt-4 text-md'>
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
  if (!media) {return null}
  if (media.length == 1) {return (
    <img src='https://media.unsplash.com/photo-1544829758-a5f8e0265cd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="rounded-2xl w-full"/>
  )}
  if (media.length == 2) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img) => (
        <img src={img} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
  if (media.length == 3) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img) => (
        <img src={img} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
  if (media.length == 4) {return (
    <div className='grid grid-cols-2 gap-2'>
      {media.map((img) => (
        <img src={img} className="rounded-2xl w-full"/>
      ))}
    </div>
  )}
}

export default Post