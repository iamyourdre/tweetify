import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  media: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  }
}, {timestamps: true});

function arrayLimit(val) {
  return val.length <= 4;
}

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;