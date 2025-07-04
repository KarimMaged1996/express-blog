// Import model
import User from "./models";

// import schemas
import { registrationRequestType } from "./schemas";

// Import utils
import { hashPassword } from "../utils/bcrypt";

export const checkEmailExists = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  return true;
};

export const createUser = async (userdata: registrationRequestType) => {
  const { password, ...rest } = userdata;

  const hashedPass = await hashPassword(password);

  const user = new User({ ...rest, password: hashedPass });
  await user.save();
  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const getUserByMail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
  const user = await User.findOne({ refreshToken });
  return user;
};
