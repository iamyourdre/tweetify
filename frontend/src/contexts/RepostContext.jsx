import React, { createContext, useContext, useState } from 'react';

const RepostContext = createContext();

export const useRepostContext = () => {
  return useContext(RepostContext);
};

export const RepostProvider = ({ children }) => {
  const [repostPost, setRepostPost] = useState(null);

  return (
    <RepostContext.Provider value={{ repostPost, setRepostPost }}>
      {children}
    </RepostContext.Provider>
  );
};