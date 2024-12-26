import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { text, type, parentPost, repostContent } = req.body;
    const author = req.user._id;
    const images = req.files.map(file => file.path);
    
    if (!text && images.length === 0 && type !== 'repost') {
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

    if (type === 'repost' && repostContent) {
      const parent = await Post.findById(repostContent);
      if (parent) {
        parent.reposts.push(newPost._id);
        await parent.save();
      }
    }

    const postData = await newPost.save();

    res.status(201).json(postData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to create post." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ type: { $in: ['post', 'repost'] } })
      .populate({ path: "author", select: "-password" })
      .populate("comments")
      .populate({
        path: "repostContent",
        select: ["-parentPost", "-repostContent", "-reposts", "-likes"],
        populate: { path: "author", select: ["username", "profilePic", "fullName"] }
      })
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
      .populate("comments")
      .populate({
        path: "repostContent",
        select: ["-parentPost", "-repostContent", "-reposts", "-likes"],
        populate: { path: "author", select: ["username", "profilePic", "fullName"] }
      });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const childPosts = await Post.find({ parentPost: id })
      .populate({ path: "author", select: ["username", "profilePic", "fullName"] })
      .populate("comments");

    res.status(200).json({ post, childPosts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to get post." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    await Post.deleteMany({ parentPost: id });
    await Post.deleteOne({ _id: id });

    res.status(200).json({ message: "Post and its child posts deleted successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to delete post." });
  }
};