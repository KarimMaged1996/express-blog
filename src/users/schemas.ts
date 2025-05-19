import { Document } from "mongoose";
import z from "zod";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  photo?: string;
  isActive: boolean;
  refreshToken?: string;
}

// registration
export const registrationValidation = z.object({
  email: z.string({ required_error: "email is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z.string({ required_error: "password is required" }),
});

export type registrationRequestType = z.infer<typeof registrationValidation>;

// activation
export const activationValidation = z.object({
  id: z.string({ required_error: "Id is required" }),
});

export type activationRequestType = z.infer<typeof activationValidation>;

// login
export const loginValidation = z.object({
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
});

export type loginRequestType = z.infer<typeof loginValidation>;

// refresh
export const refreshValidation = z.object({
  refreshToken: z.string({ required_error: "refresh_token is required" }),
});

export type refreshRequestType = z.infer<typeof refreshValidation>;

// jwt
export type JWTPayload = {
  email: string;
  username: string;
};
