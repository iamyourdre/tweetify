import Notification from "../models/notification.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createNotification = async (req, res) => {
  try {
    const { notifTo, type, post } = req.body;
    const notifBy = req.user._id;

    const newNotification = new Notification({
      notifBy,
      notifTo,
      type,
      post,
    });

    await newNotification.save();

    // Socket.io functionality
    const receiverSocketId = getReceiverSocketId(notifTo);
    if (receiverSocketId) {
      // Emitting the notification to the receiver
      io.to(receiverSocketId).emit("newNotification", newNotification);
    }

    res.status(200).json(newNotification);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to create notification." });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ notifTo: userId }).populate("post");

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get notifications." });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to mark notification as read." });
  }
};