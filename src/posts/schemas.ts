import { Document, Schema } from "mongoose";

export interface IPost extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
