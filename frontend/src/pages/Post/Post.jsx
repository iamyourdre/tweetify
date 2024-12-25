import React, { useEffect, useState } from 'react'
import useGetPost from '../../hooks/useGetPost';
import { useParams, useNavigate } from 'react-router-dom';
import PostComponent from '../../components/Post';
import RepostComponent from '../../components/Repost';
import { HiChevronLeft } from 'react-icons/hi2';
import Loading from '../../components/Loading';

const Post = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const { loading, getPost } = useGetPost();
  const navigate = useNavigate();

  useEffect(() => {
    getPost({ postId })
      .then((data) => setPost(data))
  }, [postId]);

  return (
    <>
      {loading && <Loading />}
      {post && (
        <div className="grid lg:grid-cols-8" >
          <div className='border-r border-gray-700 h-full min-h-screen lg:col-span-5 relative'>
            <div className='w-full bg-base-100 px-4 py-5 z-10 border-b border-gray-700'>
              <div onClick={() => navigate(-1)} className='flex items-center gap-4 text-xl cursor-pointer'>
                <HiChevronLeft className='text-2xl'/>
                <p className='text-xl font-bold'>Post</p>
              </div>
            </div>
            <div className='border-b border-gray-600 '>
              {post.post.type === 'post' ? (
                <PostComponent post={post.post} />
              ) : (
                <RepostComponent post={post.post} />
              )}
            </div>
            {post.childPosts.map((childPost) => (
              <div className='border-b border-gray-600' key={childPost._id}>
                <PostComponent post={childPost} />
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 hidden z-50 lg:flex flex-col gap-4">
            R
          </div>
        </div>
      )}
    </>
  )
}

export default Post