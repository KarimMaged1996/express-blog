import { Schema, model } from "mongoose";

// Import types
import { IUser } from "./schemas";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  photo: String,
  isActive: { type: Boolean, required: true, default: false },
});

const User = model("User", UserSchema);

export default User;
