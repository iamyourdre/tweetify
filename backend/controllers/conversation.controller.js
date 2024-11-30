import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";

// show name, profile pic, last message, time of last message from conversation
export const getConversations = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user._id);
    const conversations = await Conversation.find({
      participants: id,
    })
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 } // Get the last message
    })
    .populate({
      path: 'participants',
      select: 'fullName profilePic' // Include only name and profilePic fields
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Failed to get conversation."});
  }
}