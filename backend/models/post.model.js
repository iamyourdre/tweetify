import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum : ['post','share'],
    default: 'post'
  },
  sharedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  media: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  }
}, {timestamps: true});

function arrayLimit(val) {
  return val.length <= 4;
}

const Post = mongoose.model("Post", postSchema);

export default Post;