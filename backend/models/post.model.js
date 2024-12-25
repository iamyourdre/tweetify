import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    default: ""
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum : ['post','childPost','comment','repost'],
    default: 'post'
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  repostContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    default: null
  },
  media: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  reposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
}, {timestamps: true});

function arrayLimit(val) {
  return val.length <= 4;
}

const Post = mongoose.model("Post", postSchema);

export default Post;