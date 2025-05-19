// Import types
import { IUser } from "./users/schemas";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
