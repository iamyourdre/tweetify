import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import useNotification from "../zustand/useNotification";
import toast from "react-hot-toast";

const useListenNotification = () => {
  const { socket } = useSocketContext();
  const { notifications, setNotifications } = useNotification();

  useEffect(() => {
    socket?.on("newNotification", (newNotification) => {
      setNotifications([...notifications, newNotification]);
      toast.success("You have a new notification!");
    });

    return () => {
      socket?.off("newNotification");
    };
  }, [socket, notifications, setNotifications]);
};

export default useListenNotification;