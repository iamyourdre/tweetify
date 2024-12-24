import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { text, type, parentPost, repostContent } = req.body;
    const author = req.user._id;
    const images = req.files.map(file => file.path);

    if (!text && images.length === 0) {
      return res.status(400).json({ error: "Cannot create post with empty content." });
    }

    const newPost = new Post({
      content: text,
      author,
      type,
      parentPost,
      repostContent,
      media: images,
    });

    const postData = await newPost.save();

    res.status(201).json(postData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to create post." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ type: 'post' })
      .populate({ path: "author", select: "-password" })
      .populate("comments")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get posts." });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate({ path: "author", select: "-password" })
      .populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const childPosts = await Post.find({ parentPost: id })
      .populate({ path: "author", select: "-password" })
      .populate("comments");

    res.status(200).json({ post, childPosts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get post." });
  }
};