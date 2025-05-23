import { Router } from "express";

// Import routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import {
  createPostValidation,
  editPostValidation,
  getPostsValidation,
  objectIdParamValidation,
} from "./schemas";

// Import controllers
import {
  createPost,
  deletePost,
  editPost,
  postsList,
  userPostsList,
} from "./controllers";

// Import middleware
import { authMiddleware } from "../middleware/AuthMiddleware";

const postsRouter = Router();

postsRouter.use(authMiddleware);

postsRouter
  .route(ROUTES.POSTS.ROUTES.CREATE)
  .post(validate(createPostValidation), createPost);

postsRouter
  .route(ROUTES.POSTS.ROUTES.LIST)
  .get(validate(getPostsValidation, "query"), postsList);

postsRouter
  .route(ROUTES.POSTS.ROUTES.USER_LIST)
  .get(
    validate(getPostsValidation, "query"),
    validate(objectIdParamValidation, "params"),
    userPostsList
  );

postsRouter
  .route(ROUTES.POSTS.ROUTES.DELETE)
  .delete(validate(objectIdParamValidation, "params"), deletePost);

postsRouter
  .route(ROUTES.POSTS.ROUTES.EDIT)
  .patch(
    validate(objectIdParamValidation, "params"),
    validate(editPostValidation),
    editPost
  );

export default postsRouter;
