import { Request, Response, NextFunction } from "express";

// Import schemas
import { registrationRequestType } from "./schemas";

// Import utils
import { checkUserExists, createUser } from "./utils";

export const register = async (
  req: Request<{}, {}, registrationRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExists = await checkUserExists(req.body.email);

    if (userExists) {
      res.status(400).json({ error: "This user already exists" });
      return;
    }

    await createUser(req.body);

    res.status(201).json("user created successfully");
  } catch (err) {
    next(err);
  }
};
