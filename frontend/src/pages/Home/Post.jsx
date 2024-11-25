import React from 'react'

const Post = () => {
  return (
    <div className="flex w-full flex-col gap-3 bg-gray-700 rounded-xl p-3 mb-3">
      <div className="flex items-center gap-2">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <img src='https://images.unsplash.com/photo-1544829758-a5f8e0265cd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="rounded-md w-full"/>
    </div>
  )
}

export default Post