import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import useFollowUser from '../../hooks/useFollowUser';
import useGetPosts from '../../hooks/useGetPosts';
import usePost from '../../zustand/usePost';
import Button from '../../components/Button';
import Post from '../../components/Post';
import Repost from '../../components/Repost';
import Loading from '../../components/Loading';
import { useAuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const {user: me} = useAuthContext();
  const { username } = useParams();
  const { users } = useGetUsers(username);
  const [user, setUser] = useState();
  const { following, followers, isFollowing, loading, followUser, unfollowUser } = useFollowUser(user?._id);
  const { getPostsByUserId, loading: postsLoading } = useGetPosts();
  const { userPosts } = usePost();

  useEffect(() => {
    if (users[0]) {
      setUser(users[0]);
    }
    if (users[0]?._id) {
      getPostsByUserId(users[0]._id);
    }
  }, [users]);

  return (
    <div className='min-h-screen border-r border-gray-600'>
      {user && 
        <>
          <ProfileHeader user={user} isFollowing={isFollowing} followUser={followUser} unfollowUser={unfollowUser} following={following} followers={followers} meId={me._id} />
          <div className='px-4 py-6 lg:px-10 text-xl font-semibold border-t border-b border-gray-600'>Posts & Replies</div>
          <div className="">
            {postsLoading && 
              <Loading />
            }
            {!postsLoading && userPosts.length > 0 ? (
              userPosts.map(post => (
                post.type === 'post' ? (
                  <div className='lg:px-6 border-b border-gray-600' key={post._id}>
                    <Post post={post} />
                  </div>
                ) : (
                  <div className='lg:px-6 border-b border-gray-600' key={post._id}>
                    <Repost post={post} />
                  </div>
                )
              ))
            ) : (
              <div className='text-center text-gray-500 mt-16'>
                No posts found
              </div>
            )}
          </div>
        </>
      }
    </div>
  );
};

const ProfileHeader = ({ user, isFollowing, followUser, unfollowUser, following, followers, meId }) => {
  return (
    <div className="flex items-start gap-4 px-4 py-16 lg:px-10 bg-base-300">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <img src={user.profilePic} alt="profile" className="w-16 h-16 rounded-full" />
          <div>
            <h1 className="lg:text-2xl font-semibold">{user.username}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          {/* <h2>Following: {following.length}</h2>
          <h2>Followers: {followers.length}</h2> */}
          <p className='text-gray-500'><span className='font-bold text-gray-50'>{followers.length}</span> Followers</p>
          <p className='text-gray-500'><span className='font-bold text-gray-50'>{following.length}</span> Following</p>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-end">
        {user._id !== meId ? (
          <Button 
            text={isFollowing ? "Unfollow" : "Follow"} 
            addClass={isFollowing ? "btn-outline" : ''} 
            onClick={isFollowing ? unfollowUser : followUser} 
          />
        ) : (''
          // <Button text="Edit Profile" addClass="btn-outline" />
        )}
      </div>
    </div>
  );
};

export default Profile;