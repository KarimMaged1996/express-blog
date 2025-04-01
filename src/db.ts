import mongoose from "mongoose";
import config from "./config";

const connectDb = async () => {
  try {
    const connectionStr = config.DATABASE_CONNECTION_STR;

    if (!connectionStr) {
      throw new Error(
        'The environment variable "DB_CONNECTION_STR" is not defined'
      );
    }

    await mongoose.connect(connectionStr);
    console.info("Database connected successfully");
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;
