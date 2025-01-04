import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import useNotification from "../zustand/useNotification";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";

const useListenNotification = () => {
  const { socket } = useSocketContext();
  const { notifications, setNotifications } = useNotification();

  useEffect(() => {
    socket?.on("newNotification", (newNotification) => {
      const existingNotificationIndex = notifications.findIndex(
        (notification) => notification._id === newNotification._id
      );

      if (existingNotificationIndex !== -1) {
        // Update the existing notification
        const updatedNotifications = [...notifications];
        updatedNotifications[existingNotificationIndex] = newNotification;
        setNotifications(updatedNotifications);
      } else {
        // Add the new notification
        setNotifications([...notifications, newNotification]);
      }

      let message = "";
      switch (newNotification.type) {
        case "liked":
          message = `${newNotification.notifBy.fullName} menyukai postingan anda`;
          break;
        case "commented":
          message = `${newNotification.notifBy.fullName} mengomentari postingan anda`;
          break;
        case "reposted":
          message = `${newNotification.notifBy.fullName} membagikan ulang postingan anda`;
          break;
        case "followed":
          message = `${newNotification.notifBy.fullName} mulai mengikuti anda`;
          break;
        default:
          message = "Anda memiliki notifikasi baru!";
      }

      toast.success(message, {
        position: "bottom-right",
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: (
          <img src={newNotification.notifBy.profilePic} alt="avatar" className="w-6 h-6 rounded-full" />
        ),
      });
    });

    return () => {
      socket?.off("newNotification");
    };
  }, [socket, notifications, setNotifications]);
};

export default useListenNotification;