import {create} from 'zustand';

const useNotification = create((set) => ({
  notifications: [],
  setNotifications: (newNotifications) => set({ notifications: newNotifications }),
}));

export default useNotification;