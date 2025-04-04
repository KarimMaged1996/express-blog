import { Document } from "mongoose";
import z from "zod";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  photo?: string;
  isActive: boolean;
}

// registration
export const registrationValidation = z.object({
  email: z.string({ required_error: "email is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z.string({ required_error: "password is required" }),
});

export type registrationRequestType = z.infer<typeof registrationValidation>;
