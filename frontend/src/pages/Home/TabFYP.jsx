import React, { useEffect } from 'react'
import usePost from '../../zustand/usePost';
import Post from '../../components/Post'
import useGetPosts from '../../hooks/useGetPosts';

const TabFYP = () => {
  const { loading, getFyp } = useGetPosts();
  const { fyp } = usePost();

  useEffect(() => {
    if(!fyp.length) {
      getFyp();
    }
  }, [fyp]);

  return (
    <div className=''>
      {loading && 
        <div className='h-full'>
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-dots loading-lg text-emerald-400"></span>
          </div>
        </div>
      }
      {!loading &&
        fyp.map((post) => (
          <Post key={post._id} post={post} />
        ))
      }
    </div>
  )
}

export default TabFYP