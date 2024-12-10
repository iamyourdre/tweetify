import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// show name, profile pic, last message, time of last message from conversation
export const getConversations = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.user._id);
    const conversations = await Conversation.aggregate([
      { $match: { participants: id, 'messages.0': { $exists: true } } },
      { $unwind: '$messages' },
      { $sort: { 'messages': -1 } },
      { $group: {
        _id: '$_id',
        participants: { $first: '$participants' },
        lastMessageId: { $first: '$messages' },
        updatedAt: { $first: '$updatedAt' }
      }},
      { $lookup: {
        from: 'messages',
        localField: 'lastMessageId',
        foreignField: '_id',
        as: 'lastMessage'
      }},
      { $unwind: '$lastMessage' },
      { $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'participants'
      }},
      { $project: {
        'participants._id': 1,
        'participants.fullName': 1,
        'participants.profilePic': 1,
        'participants.username': 1,
        'lastMessage._id': 1,
        'lastMessage.message': 1,
        'lastMessage.createdAt': 1,
        updatedAt: 1
      }},
      { $sort: { updatedAt: -1 } }
    ]);
    
    // Socket.io functionality
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   // Emitting the message to the receiver
    //   io.to(receiverSocketId).emit("updateConversation", conversations);
    // }

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
export const getConversationById = async (req, res) => {
  try {
    const senderId = new mongoose.Types.ObjectId(req.user._id);
    const [conversationIdStr, receiverIdStr] = req.params.id.split('-');
    const conversationId = new mongoose.Types.ObjectId(conversationIdStr);
    const receiverId = new mongoose.Types.ObjectId(receiverIdStr);
    const conversation = await Conversation.aggregate([
      { $match: { _id: conversationId, participants: senderId, 'messages.0': { $exists: true } } },
      { $unwind: '$messages' },
      { $sort: { 'messages': -1 } },
      { $group: {
        _id: '$_id',
        participants: { $first: '$participants' },
        lastMessageId: { $first: '$messages' },
        updatedAt: { $first: '$updatedAt' }
      }},
      { $lookup: {
        from: 'messages',
        localField: 'lastMessageId',
        foreignField: '_id',
        as: 'lastMessage'
      }},
      { $unwind: '$lastMessage' },
      { $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'participants'
      }},
      { $project: {
        'participants._id': 1,
        'participants.fullName': 1,
        'participants.profilePic': 1,
        'participants.username': 1,
        'lastMessage._id': 1,
        'lastMessage.message': 1,
        'lastMessage.createdAt': 1,
        updatedAt: 1
      }},
      { $sort: { updatedAt: -1 } }
    ]);
    
    // Socket.io functionality
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   // Emitting the message to the receiver
    //   io.to(receiverSocketId).emit("updateConversation", conversation);
    // }

    res.status(200).json(conversation);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Failed to get conversation."});
  }
}