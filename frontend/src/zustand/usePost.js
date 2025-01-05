import { create } from 'zustand';

const usePost = create((set) => ({
  fyp: [],
  userPosts: [],
  followingPosts: [],
  setFyp: (fyp) => set({ fyp }),
  setUserPosts: (userPosts) => set({ userPosts }),
  setFollowingPosts: (followingPosts) => set({ followingPosts }),
}));

export default usePost;