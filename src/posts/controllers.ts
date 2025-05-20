import { Request, Response, NextFunction } from "express";

// Import types
import { createPostRequestType } from "./schemas";

// Import utils
import { createPostInstance } from "./utils";

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
