import { create } from 'zustand';

const usePost = create((set) => ({
  fyp: [],
  userPosts: [],
  setFyp: (fyp) => set({ fyp }),
  setUserPosts: (userPosts) => set({ userPosts }),
}));

export default usePost;