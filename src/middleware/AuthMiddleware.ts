import { Request, Response, NextFunction } from "express";

// Import helpers
import { verifyAccessToken } from "../utils/jwt";
import { getUserByMail } from "../users/utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      res.sendStatus(401);
      return;
    }

    const accessToken = authHeaders.split(" ")[1];
    const { decoded } = verifyAccessToken(accessToken);

    if (!decoded) {
      res.sendStatus(401);
      return;
    }

    const user = (await getUserByMail(decoded.email)) as any;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
