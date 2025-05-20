import { Router } from "express";

// Import Routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import {
  registrationValidation,
  activationValidation,
  loginValidation,
  refreshValidation,
} from "./schemas";

// import controllers
import { register, activateUser, login, refresh, logout } from "./controllers";

// Import middlewares
import { authMiddleware } from "../middleware/AuthMiddleware";

const authRouter = Router();

authRouter
  .route(ROUTES.AUTH.ROUTES.REGISTER)
  .post(validate(registrationValidation), register);

authRouter
  .route(ROUTES.AUTH.ROUTES.ACTIVATE)
  .post(validate(activationValidation), activateUser);

authRouter
  .route(ROUTES.AUTH.ROUTES.LOGIN)
  .post(validate(loginValidation), login);

authRouter
  .route(ROUTES.AUTH.ROUTES.REFRESH)
  .post(validate(refreshValidation), refresh);

authRouter.route(ROUTES.AUTH.ROUTES.LOGOUT).post(authMiddleware, logout);

export default authRouter;
