import React from 'react'
import { formatDistanceToNow } from 'date-fns';


const Post = ({post}) => {
  console.log("Post", post)
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  return (
    <div className="flex w-full flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
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
      <img src='https://images.unsplash.com/photo-1544829758-a5f8e0265cd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="rounded-2xl w-full"/>
    </div>
  )
}

export default Post