import Room from "../models/room.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const {message} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let room = await Room.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })

    if(!room) {
      room = await Room.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if(newMessage){
      room.messages.push(newMessage._id);
    }

    // Will run in parallel
    await Promise.all([room.save(), newMessage.save()]);

    // Socket.io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      // Emitting the message to the receiver
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Something went wrong."});
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const room = await Room.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");

    if(!room){
      return res.status(200).json({messages: []});
    }

    res.status(200).json(room.messages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Something went wrong."});
  }
}