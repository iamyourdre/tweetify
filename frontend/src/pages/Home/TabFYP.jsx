import React, { useEffect } from 'react'
import usePost from '../../zustand/usePost';
import Post from '../../components/Post'
import useGetPosts from '../../hooks/useGetPosts';
import Loading from '../../components/Loading';

const TabFYP = () => {
  const { loading, getFyp } = useGetPosts();
  const { fyp } = usePost();

  useEffect(() => {
    if(!fyp.length) {
      getFyp();
    }
  }, []);

  return (
    <div className=''>
      {loading && 
        <Loading />
      }
      {!loading && fyp.length > 0 && 
        <div className='border-t border-gray-600 mt-1'>
          {fyp.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      }
      {!loading && fyp.length === 0 &&
        <div className='text-center text-gray-500 mt-10'>
          No posts found
        </div>
      }
    </div>
  )
}

export default TabFYP