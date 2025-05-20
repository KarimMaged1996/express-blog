import { Router } from "express";

// Import routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import { createPostValidation, getPostsValidation } from "./schemas";

// Import controllers
import { createPost, postsList } from "./controllers";

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

export default postsRouter;
