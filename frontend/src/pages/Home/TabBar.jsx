import React, { useContext, useState } from 'react'
import { HomeTabContext } from '../../contexts/HomeTabContext';
import useGetPosts from '../../hooks/useGetPosts';

const TabBar = () => {
  const { activeHomeTab, setActiveHomeTab } = useContext(HomeTabContext);
  const { loading, getFyp } = useGetPosts();
  const [clickFypCount, setClickFypCount] = useState(0);
  const [clickFollowingCount, setClickFollowingCount] = useState(0);

  const handleTabFyp = () => {
    setActiveHomeTab(1);
    setClickFypCount(clickFypCount + 1);
    if(clickFypCount === 1) {
      getFyp();
      setClickFypCount(0);
      setClickFollowingCount(0);
      console.log('fyp refreshed');
    } else {
      setClickFollowingCount(0);
      console.log('fyp opened');
    }
  };

  const handleTabFollowing = () => {
    setActiveHomeTab(2);
    setClickFollowingCount(clickFollowingCount + 1);
    if(clickFollowingCount === 1) {
      // getFollowing();
      setClickFollowingCount(0);
      setClickFypCount(0);
      console.log('following refreshed');
    } else {
      setClickFypCount(0);
      console.log('following opened');
    }
  }

  return (
    <div className='fixed w-full bg-base-100/80 backdrop-blur-md z-10'>
      <div className="flex pt-2">
        
        <button
          onClick={() => handleTabFyp()}
          className={`block pt-4 pb-5 px-3.5 ml-4 font-bold ${activeHomeTab == 1 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          FYP
        </button>
        <button
          onClick={() => handleTabFollowing()}
          className={`block pt-4 pb-5 px-3.5 ml-4 font-medium ${activeHomeTab == 2 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default TabBar