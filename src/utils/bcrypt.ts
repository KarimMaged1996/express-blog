import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    return hashedPass;
  } catch {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const result = bcrypt.compare(password, hashedPassword);
    return result;
  } catch {
    throw new Error("Error comparing passowrds");
  }
};
