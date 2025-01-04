import Notification from "../models/notification.model.js";
import User from "../models/user.model.js"; // Import User model
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createNotification = async (notifBy, notifTo, type, post) => {
  try {
    if (notifBy.toString() === notifTo.toString()) {
      return;
    }

    let existingNotification;

    if (type === "liked") {
      existingNotification = await Notification.findOne({
        notifBy,
        notifTo,
        type,
        post,
      });
    } else if (type === "followed") {
      existingNotification = await Notification.findOne({
        notifBy,
        notifTo,
        type,
      });
    }

    if (existingNotification) {
      existingNotification.updatedAt = Date.now();
      await existingNotification.save();
      await existingNotification.populate('notifBy', ['fullName', 'profilePic', 'username']);
      const receiverSocketId = getReceiverSocketId(notifTo);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", existingNotification);
      }
      return existingNotification;
    }

    const newNotification = new Notification({
      notifBy,
      notifTo,
      type,
      post,
    });

    await newNotification.save();
    await newNotification.populate('notifBy', ['fullName', 'profilePic', 'username']);

    const receiverSocketId = getReceiverSocketId(notifTo);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", newNotification);
    }

    return newNotification;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to create notification.");
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ notifTo: userId })
      .populate("post", ['content'])
      .populate("notifBy", ['fullName', 'profilePic', 'username'])
      .sort({ updatedAt: -1 });

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