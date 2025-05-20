import { Schema, model } from "mongoose";

// Import types
import { IPost } from "./schemas";

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, minlength: 5, maxlength: 100 },
  body: { type: String, required: true, minlength: 20, maxlength: 1000 },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

const Post = model("Post", PostSchema);

export default Post;
