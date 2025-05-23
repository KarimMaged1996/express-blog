import { Request, Response, NextFunction } from "express";

// Import types
import {
  createPostRequestType,
  postsListRequestType,
  objectIdParamRequestType,
  editPostRequestType,
} from "./schemas";

// Import utils
import {
  createPostInstance,
  findPostById,
  getPosts,
  getPostsCount,
  getUserPosts,
  getUserPostsCount,
} from "./utils";

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

export const userPostsList = async (
  req: Request<objectIdParamRequestType, {}, {}, postsListRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const { id } = req.params;
    const posts = await getUserPosts(id, Number(page), Number(limit));
    const meta = {
      total: await getUserPostsCount(id),
      limit: Number(limit),
      page: Number(page),
    };
    res.json({ meta, posts });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request<objectIdParamRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    const { id: postId } = req.params;
    const post = await findPostById(postId);
    if (!post) {
      res.sendStatus(404);
      return;
    }
    if (!post.author.equals(_id)) {
      res.sendStatus(403);
      return;
    }

    await post.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const editPost = async (
  req: Request<objectIdParamRequestType, {}, editPostRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body } = req.body;
    const { id: postId } = req.params;
    const { _id } = req.user!;
    const post = await findPostById(postId);

    if (!post) {
      res.sendStatus(404);
      return;
    }

    if (!post.author.equals(_id)) {
      res.sendStatus(403);
      return;
    }

    if (title) post.title = title;
    if (body) post.body = body;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};
