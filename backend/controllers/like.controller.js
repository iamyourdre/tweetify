import Post from "../models/post.model.js";
import { createNotification } from "./notification.controller.js";

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "Post already liked." });
    }

    post.likes.push(userId);
    await post.save();

    // Create notification
    await createNotification(userId, post.author, 'liked', id);

    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to like post." });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ error: "Post not liked yet." });
    }

    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({ message: "Post unliked successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to unlike post." });
  }
};