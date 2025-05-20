import { Document, Schema } from "mongoose";
import z from "zod";

export interface IPost extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

// create post
export const createPostValidation = z.object({
  title: z
    .string({ required_error: "The title field is required" })
    .min(5, "The min title length is 5 characters")
    .max(100, "The max title length is 100 characters"),
  body: z
    .string({ required_error: "the body field is required" })
    .min(20, "The min body length is 20 characters")
    .max(1000, "The max body length is 1000 characters"),
});

export type createPostRequestType = z.infer<typeof createPostValidation>;

// get posts
export const getPostsValidation = z.object({
  page: z.string({ required_error: "page is required" }),
  limit: z.string({ required_error: "limit is required" }),
});

export type postsListRequestType = z.infer<typeof getPostsValidation>;

// get user Posts params
export const getUserPostsParamsValidation = z.object({
  id: z
    .string({ required_error: "the id param is required" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid id" }),
});

export type userPostsListParamsType = z.infer<
  typeof getUserPostsParamsValidation
>;
