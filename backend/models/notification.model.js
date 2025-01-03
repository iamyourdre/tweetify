import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  notifBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  notifTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum : ['liked','commented','reposted', 'followed'],
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  read: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;