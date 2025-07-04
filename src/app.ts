import express from "express";
import connectDb from "./db";
import errorHandler from "./error";
import config from "./config";
import initializeDocs from "./swagger";
import ROUTES from "./app_routes";

// Import routers
import authRouter from "./users/routes";
import postsRouter from "./posts/routes";

// Import utils
import { PROFILE_UPLOAD_DIR } from "./utils/variables/paths";

const app = express();

// expose user images
app.use(ROUTES.UPLOADS.USER_PHOTO, express.static(PROFILE_UPLOAD_DIR));

// built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
connectDb();

// Initialize docs
initializeDocs(app);

// use routers
app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.POSTS.BASE, postsRouter);

// use global error handler
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${PORT}`);
});
