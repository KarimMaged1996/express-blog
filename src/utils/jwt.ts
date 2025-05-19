import jwt from "jsonwebtoken";

// Import env variables
import config from "../config";

export const generateAccessToken = (user: {
  email: string;
  username: string;
}) => {
  if (!config.ACCESS_TOKEN_KEY) {
    throw new Error("No ACCESS_TOKEN_KEY in environment variables");
  }
  return jwt.sign(user, config.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: {
  email: string;
  username: string;
}) => {
  if (!config.REFRESH_TOKEN_KEY) {
    throw new Error("No ACCESS_TOKEN_KEY in environment variables");
  }
  return jwt.sign(user, config.REFRESH_TOKEN_KEY);
};

export const verifyRefreshToken = (token: string) => {
  if (!config.REFRESH_TOKEN_KEY) {
    throw new Error("No ACCESS_TOKEN_KEY in environment variables");
  }
  try {
    jwt.verify(token, config.REFRESH_TOKEN_KEY);
    return true;
  } catch (_err) {
    return false;
  }
};
