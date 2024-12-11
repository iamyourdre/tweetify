import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, parentPostId, media } = req.body;
    const author = req.user._id;

    const newPost = new Post({
      title,
      content,
      author,
      parentPost: parentPostId || null,
      media: media || []
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to create post." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("comments");

    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get posts." });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("author").populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get post." });
  }
};