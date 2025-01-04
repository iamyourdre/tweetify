import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from "./useAxios";
import useNotification from '../zustand/useNotification';

const useFetchNotifications = () => {
  const [loading, setLoading] = useState(false);
  const { notifications, setNotifications } = useNotification();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await useAxios.get(`/notifications`);
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setNotifications(res.data);
      } catch (error) {
        toast.error(error.res?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  return { loading, notifications };
};

export default useFetchNotifications;