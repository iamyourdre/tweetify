import React, { useContext } from 'react'
import { useEffect } from "react";
import { HomeTabContext } from '../../contexts/HomeTabContext';

const TabBar = () => {
  const { activeHomeTab, setActiveHomeTab } = useContext(HomeTabContext);

  useEffect(() => {
  }, [activeHomeTab]);

  return (
    <div className='fixed w-full bg-base-100/80 backdrop-blur-md'>
      <div className="join rounded-badge pt-2">
        <button
          onClick={() => setActiveHomeTab(1)}
          className={`block py-3 px-3.5 ml-4 font-bold ${activeHomeTab == 1 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          FYP
        </button>
        <button
          onClick={() => setActiveHomeTab(2)}
          className={`block py-3 px-3.5 ml-4 font-medium ${activeHomeTab == 2 ? "border-b-2 border-teal-500" : "border-b-2 border-transparent"}`}
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default TabBar