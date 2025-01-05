import React, { useEffect } from 'react';
import usePost from '../../zustand/usePost';
import Post from '../../components/Post';
import Loading from '../../components/Loading';
import Repost from '../../components/Repost';
import useGetPosts from '../../hooks/useGetPosts';

const TabFollowing = () => {
  const { loading, getFollowingPosts } = useGetPosts();
  const { followingPosts } = usePost();

  useEffect(() => {
    if(!followingPosts.length) {
      getFollowingPosts();
    }
  }, []);

  return (
    <div className=''>
      {loading && 
        <Loading />
      }
      {!loading && followingPosts.length > 0 && 
        <div className='border-t border-gray-600 mt-1'>
          {followingPosts.map(post => (
            post.type === 'post' ? (
            <div className='border-b border-gray-600' key={post._id}>
              <Post post={post} />
            </div>
            ) : (
              <div className='border-b border-gray-600' key={post._id}>
                <Repost post={post} />
              </div>
            )
          ))}
        </div>
      }
      {!loading && followingPosts.length === 0 &&
        <div className='text-center text-gray-500 mt-10'>
          No posts found
        </div>
      }
    </div>
  )
}

export default TabFollowing;