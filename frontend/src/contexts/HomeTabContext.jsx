import React, { createContext, useState } from 'react';

export const HomeTabContext = createContext();

export const HomeTabProvider = ({ children }) => {
  const [activeHomeTab, setActiveHomeTab] = useState(1);

  return (
    <HomeTabContext.Provider value={{ activeHomeTab, setActiveHomeTab }}>
      {children}
    </HomeTabContext.Provider>
  );
};