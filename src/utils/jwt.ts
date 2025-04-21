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
