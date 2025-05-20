import { Router } from "express";

// Import routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import { createPostValidation } from "./schemas";

// Import controllers
import { createPost } from "./controllers";

// Import middleware
import { authMiddleware } from "../middleware/AuthMiddleware";

const postsRouter = Router();

postsRouter.use(authMiddleware);

postsRouter
  .route(ROUTES.POSTS.ROUTES.CREATE)
  .post(validate(createPostValidation), createPost);

export default postsRouter;
