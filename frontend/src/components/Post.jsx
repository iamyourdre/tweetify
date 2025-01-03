import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaComment, FaHeart, FaRegHeart, FaShare, FaTrash } from "react-icons/fa6";
import { useRepostContext } from '../contexts/RepostContext';
import ManagePost from './ManagePost';
import useLikePost from '../hooks/useLikePost';
import { useAuthContext } from '../contexts/AuthContext';

const Post = ({ post, showFooter = true }) => {
  const navigate = useNavigate();
  const getRelativeTime = formatDistanceToNow(post.createdAt, { addSuffix: true });
  const { setRepostPost } = useRepostContext();
  const { likePost, unlikePost } = useLikePost();
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [repostsCount, setRepostsCount] = useState(post.reposts.length);

  useEffect(() => {
    if (user && post.likes.includes(user._id)) {
      setLiked(true);
    }
  }, [user, post.likes]);

  const handlePostClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRepostClick = () => {
    setRepostPost(post);
    document.getElementById('repost_modal').showModal();
  };

  const handleLikeClick = async () => {
    if (liked) {
      await unlikePost(post._id);
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      await likePost(post._id);
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const handleCommentClick = () => {
    setRepostPost(post);
    document.getElementById('create_comment_modal').showModal();
  };

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate('/' + post.author.username);
  };

  return (
    <>
      {post.type === 'comment' && (
        <Link className="inline-block px-4 py-4 text-sm" to={`/p/${post.parentPost}`}>
          <span className='text-gray-400 hover:underline'>Replied: </span>
        </Link>
      )}
      <div className={`${post.type !== 'comment' ? 'pt-6' : ''} flex w-full flex-col pb-2 gap-3 px-4 transition duration-200 ease-in-out hover:bg-base-200`} onClick={() => navigate(`/p/${post._id}`)}>
        <div className='flex text-md' id={post._id} onClick={handlePostClick}>
          <img className='w-10 h-10 cursor-pointer' src={post.author.profilePic} onClick={handleAuthorClick} />
          <div className="leading-tight pl-3 w-full cursor-pointer" onClick={handleAuthorClick}>
            <div className="flex">
              <p className='font-bold'>{post.author.fullName}</p>
            </div>
            <p className='text-sm opacity-50'>@{post.author.username + ' · ' + getRelativeTime}</p>
          </div>
        </div>
        <p className=''>{post.content}</p>
        <ImageGrid media={post.media} />
      </div>
      <div className={`flex gap-6 pb-5 pt-2 px-4 ${showFooter ? '' : 'hidden'}`}>
        <button onClick={handleCommentClick} className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaComment className='text-xl inline' />{post.comments.length}
        </button>
        <button onClick={handleRepostClick} className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          <FaShare className='text-xl inline' />{repostsCount}
        </button>
        <button onClick={handleLikeClick} className="flex gap-1 text-gray-500 hover:text-accent justify-start items-center">
          {liked ? <FaHeart className='text-xl inline text-red-500' /> : <FaRegHeart className='text-xl inline' />} {likesCount}
        </button>
        {post.author._id === user._id && (
          <div className="flex-1 text-gray-500 hover:text-accent text-right">
            <ManagePost id={post._id} />
          </div>
        )}
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

export default Post;