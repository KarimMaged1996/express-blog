import { Request, Response, NextFunction } from "express";

// Import schemas
import { registrationRequestType, activationRequestType } from "./schemas";

// Import utils
import { checkEmailExists, createUser, getUserById } from "./utils";

export const register = async (
  req: Request<{}, {}, registrationRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailExists = await checkEmailExists(req.body.email);

    if (emailExists) {
      res.status(400).json({ error: "This email already exists" });
      return;
    }

    await createUser(req.body);

    res.status(201).json("user created successfully");
  } catch (err) {
    next(err);
  }
};

export const activateUser = async (
  req: Request<{}, {}, activationRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req.body.id);

    if (!user) {
      res.status(400).json({ error: "User doesn't exist" });
      return;
    }

    user.isActive = true;
    await user.save();

    res.json({ message: "User activated successfully" });
  } catch (err) {
    next(err);
  }
};
