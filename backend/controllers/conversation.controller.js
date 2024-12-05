import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";

// show name, profile pic, last message, time of last message from conversation
export const getConversations = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user._id);
    const conversations = await Conversation.find({
      participants: id,
      'messages.0': { $exists: true } // Ensure there is at least one message
    })
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 } // Get the last message
    })
    .populate({
      path: 'participants',
      select: 'fullName profilePic username' // Include only name and profilePic fields
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Failed to get conversation."});
  }
}

export const createConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const recipientId = req.body.recipient;

    if (!senderId || !recipientId) {
      return res.status(400).json({ error: "Sender and recipient are required." });
    }

    const sender = new mongoose.Types.ObjectId(senderId);
    const receiver = new mongoose.Types.ObjectId(recipientId);

    // check if conversation already exists
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    })
    .populate({
      path: 'participants',
      select: 'fullName profilePic username'
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    let newConversation = await Conversation.create({
      participants: [sender, receiver],
    });

    newConversation = await newConversation.populate({
      path: 'participants',
      select: 'fullName profilePic username' // Include only name and profilePic fields
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to create conversation." });
  }
}