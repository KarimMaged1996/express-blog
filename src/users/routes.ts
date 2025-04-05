import { Router } from "express";

// Import Routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import { registrationValidation, activationValidation } from "./schemas";

// import controllers
import { register, activateUser } from "./controllers";

const authRouter = Router();

authRouter
  .route(ROUTES.AUTH.ROUTES.REGISTER)
  .post(validate(registrationValidation), register);

authRouter
  .route(ROUTES.AUTH.ROUTES.ACTIVATE)
  .post(validate(activationValidation), activateUser);

export default authRouter;
