// Import model
import User from "./models";

// import schemas
import { registrationRequestType } from "./schemas";

// Import utils
import { hashPassword } from "../utils/bcrypt";

export const checkUserExists = async (email: string) => {
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
