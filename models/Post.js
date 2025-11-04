import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Post must have a title"],
  },
  body: {
    type: String,
    require: [true, "Post must have a body"],
  },
});

const Post = mongoose.model("Post", Schema);

export default Post;
