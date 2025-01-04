import useAxios from "./useAxios";
import useNotification from '../zustand/useNotification';

const useMarkAsRead = () => {
  const { notifications, setNotifications } = useNotification();

  const markAsRead = async (id) => {
    try {
      const response = await useAxios.patch(`/notifications/${id}/read`);
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
      return response.data;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  };

  return { markAsRead };
};

export default useMarkAsRead;