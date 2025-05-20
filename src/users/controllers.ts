import { Request, Response, NextFunction } from "express";
import ejs from "ejs";
import config from "../config";
import ROUTES from "../app_routes";

// Import schemas
import {
  registrationRequestType,
  activationRequestType,
  loginRequestType,
  refreshRequestType,
} from "./schemas";

// Import utils
import {
  checkEmailExists,
  createUser,
  getUserById,
  getUserByMail,
  getUserByRefreshToken,
} from "./utils";
import { sendMail } from "../utils/nodemailer";
import { comparePassword } from "../utils/bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

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
        submitionPath: `${config.SERVER_URL}${ROUTES.AUTH.BASE}${ROUTES.AUTH.ROUTES.ACTIVATE}`,
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

export const login = async (
  req: Request<{}, {}, loginRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByMail(email);

    if (!user) {
      res.json({ error: "Wrong credentials" });
      return;
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      res.json({ error: "Wrong credentials" });
      return;
    }

    if (!user.isActive) {
      res.json({ error: "You must activate your email first" });
    }

    const { username } = user;

    const accessToken = generateAccessToken({ email, username });
    const refreshToken = generateRefreshToken({ email, username });

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request<{}, {}, refreshRequestType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      res.status(400).json({ error: "Invalid Token" });
      return;
    }

    const isRefreshValid = verifyRefreshToken(refreshToken);

    if (!isRefreshValid) {
      res.status(400).json({ error: "Invalid Token" });
      return;
    }

    const accessToken = generateAccessToken({
      email: user.email,
      username: user.username,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user!;
    const user = await getUserByMail(email);
    user!.refreshToken = undefined;
    await user!.save();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
