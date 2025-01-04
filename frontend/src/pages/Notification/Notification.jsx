import React from 'react';
import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import useFetchNotifications from '../../hooks/useFetchNotifications';
import useMarkAsRead from '../../hooks/useMarkAsRead';
import RightSide from '../Home/RightSide';
import { formatDistanceToNow } from 'date-fns';
import Loading from '../../components/Loading';

const Notification = () => {
  const { notifications, loading } = useFetchNotifications();
  const { markAsRead } = useMarkAsRead();

  console.log(notifications);

  const handleMarkAsRead = async (id, url) => {
    try {
      await markAsRead(id);
      window.location.href = url;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <div className='min-h-screen border-r border-gray-600 grid lg:grid-cols-8'>
      <div className="lg:col-span-5 relative">
        <div className='w-full bg-base-100 px-4 py-5 z-10 border-b border-gray-600'>
          <p className='text-xl font-bold'>Notifications</p>
        </div>
        <div className="flex flex-col">
          {loading && <Loading />}
          {notifications.map(notification => {
            const url = notification.post ? `/p/${notification.post._id}` : `/${notification.notifBy.username}`;
            return (
              <button className='flex px-4 py-6 border-b border-gray-700 text-left' key={notification._id} onClick={() => handleMarkAsRead(notification._id, url)}>
                <img className='w-10 h-10' src={notification.notifBy.profilePic} alt="Profile"/>
                <div className="leading-tight pl-3 w-full">
                  <div className="flex flex-col gap-1">

                    {notification.type === 'liked' && (
                      <>
                        <p className='text-md'>
                          <span className='font-semibold'>{notification.notifBy.fullName}</span>
                          &nbsp;liked your post.
                        </p>
                        <p className='text-sm text-ellipsis overflow-hidden line-clamp-2 flex gap-1.5'>
                          <FaHeart className='inline text-accent my-auto' />
                          <span className='opacity-50'>{notification.post.content}.</span>
                        </p>
                      </>
                    )}
                    {notification.type === 'commented' && (
                      <>
                        <p className='text-md'>
                          <span className='font-semibold'>{notification.notifBy.fullName}</span>
                          &nbsp;commented on your post.
                        </p>
                        <p className='text-sm text-ellipsis overflow-hidden line-clamp-2 flex gap-1.5'>
                          <FaComment className='inline text-accent my-auto' />
                          <span className='opacity-50'>Click to see.</span>
                        </p>
                      </>
                    )}
                    {notification.type === 'followed' && (
                      <>
                        <p className='text-md'>
                          <span className='font-semibold'>{notification.notifBy.fullName}</span>
                          &nbsp;started to following you.
                        </p>
                        <p className='text-sm opacity-50 text-ellipsis overflow-hidden line-clamp-2'>
                          @{notification.notifBy.username}
                        </p>
                      </>
                    )}
                    <p className='text-sm opacity-25'>
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </p>
                    
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="lg:col-span-3 hidden z-50 lg:flex flex-col gap-4 pr-4">
        <RightSide/>
      </div>
    </div>
  );
};

export default Notification;