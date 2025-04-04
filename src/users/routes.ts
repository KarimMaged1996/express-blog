import { Router } from "express";

// Import Routes
import ROUTES from "../app_routes";

// Import validations
import { validate } from "../utils/validation";
import { registrationValidation } from "./schemas";

// import controllers
import { register } from "./controllers";

const authRouter = Router();

authRouter
  .route(ROUTES.AUTH.ROUTES.REGISTER)
  .post(validate(registrationValidation), register);

export default authRouter;
