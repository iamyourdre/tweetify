import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  media: {
    type: String,
    default: null
  }
}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;