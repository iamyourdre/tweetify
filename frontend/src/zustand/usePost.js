import {create} from 'zustand';

const usePost = create((set) => ({
  fyp: [],
  setFyp: (fyp) => set({ fyp }),
}));

export default usePost;