import React, { useContext } from 'react'
import { HomeTabContext } from '../../contexts/HomeTabContext';

const TabBar = () => {
  const { activeHomeTab, setActiveHomeTab } = useContext(HomeTabContext);

  const handleTabFyp = () => {
    setActiveHomeTab(1);
  };

  const handleTabFollowing = () => {
    setActiveHomeTab(2);
  }

  return (
    <div className='fixed w-full bg-base-100/80 backdrop-blur-md z-10'>
      <div className="flex pt-2">
        
        <button
          onClick={() => handleTabFyp()}
          className={`block py-4 px-3.5 ml-4 font-bold ${activeHomeTab == 1 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          FYP
        </button>
        <button
          onClick={() => handleTabFollowing()}
          className={`block py-4 px-3.5 ml-4 font-medium ${activeHomeTab == 2 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default TabBar