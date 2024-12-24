import React, { useContext, useState } from 'react'
import { HomeTabContext } from '../../contexts/HomeTabContext';
import useGetPosts from '../../hooks/useGetPosts';

const TabBar = () => {
  const { activeHomeTab, setActiveHomeTab } = useContext(HomeTabContext);
  const { loading, getFyp } = useGetPosts();
  const [clickCount, setClickCount] = useState(0);

  const handleTabFyp = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        setActiveHomeTab(1);
        getFyp();
        return 0; // reset click count after triggering getFyp
      }
      return newCount;
    });
  };

  const handleTabFollowing = () => {
    setActiveHomeTab(2);
    setClickCount(0); // reset click count when switching tabs
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