import { Request, Response, NextFunction } from "express";
import ejs from "ejs";

// Import schemas
import { registrationRequestType, activationRequestType } from "./schemas";

// Import utils
import { checkEmailExists, createUser, getUserById } from "./utils";
import { sendMail } from "../utils/nodemailer";

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

    const user = await createUser(req.body);

    const html = await ejs.renderFile(
      "src/templates/user_activation_mail.ejs",
      {
        name: user.username,
        id: user._id,
        submitionPath: "http://localhost:8000/auth/activate",
      }
    );

    await sendMail({
      to: user.email,
      subject: "Email Activation",
      html,
    });

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

    res.send("<h1>User activated successfully<\h1>");
  } catch (err) {
    next(err);
  }
};
