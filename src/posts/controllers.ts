import { Request, Response, NextFunction } from "express";

// Import types
import { createPostRequestType, postsListRequestType } from "./schemas";

// Import utils
import { createPostInstance, getPosts, getPostsCount } from "./utils";

export const createPost = async (
  req: Request<{}, {}, createPostRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;
    const { title, body } = req.body;
    const post = await createPostInstance(user._id, title, body);
    const { __v, ...postObj } = post.toObject();
    res.status(201).json(postObj);
  } catch (err) {
    next(err);
  }
};

export const postsList = async (
  req: Request<{}, {}, {}, postsListRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const posts = await getPosts(Number(page), Number(limit));
    const meta = {
      total: await getPostsCount(),
      limit: Number(limit),
      page: Number(page),
    };
    res.json({ meta, posts });
  } catch (err) {
    next(err);
  }
};
