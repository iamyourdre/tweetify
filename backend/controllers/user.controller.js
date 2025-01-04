import User from "../models/user.model.js";
import Follower from "../models/follower.model.js";
import { createNotification } from "./notification.controller.js";

export const getUsersBySearch = async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const currentUserId = req.user._id;
    const users = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: searchQuery, $options: "i" } },
            { fullName: { $regex: searchQuery, $options: "i" } }
          ]
        }
      ]
    })
    .select('-password -__v')
    .sort({ username: 1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}

export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await Follower.find({ userId }).populate('followerId', 'username fullName profilePic');
    res.status(200).json(following);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follower.find({ followerId: userId }).populate('userId', 'username fullName profilePic');
    res.status(200).json(followers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const isFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;
    const isFollowing = await Follower.findOne({ userId, followerId: targetUserId });
    res.status(200).json({ isFollowing: !!isFollowing });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    const existingFollow = await Follower.findOne({ userId, followerId: targetUserId });
    if (existingFollow) {
      return res.status(400).json({ error: "You are already following this user." });
    }

    const newFollow = new Follower({ userId, followerId: targetUserId });
    await newFollow.save();

    await createNotification(userId, targetUserId, 'followed', userId);

    res.status(200).json({ message: "Followed successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;
    await Follower.findOneAndDelete({ userId, followerId: targetUserId });
    res.status(200).json({ message: "Unfollowed successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};