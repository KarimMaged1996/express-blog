import { Schema, model } from "mongoose";

// Import types
import { IPost } from "./schemas";

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
});

const Post = model("Post", PostSchema);

export default Post;
