import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionStr = process.env.DB_CONNECTION_STR;

    if (!connectionStr) {
      throw new Error(
        'The environment variable "DB_CONNECTION_STR" is not defined'
      );
    }

    await mongoose.connect(connectionStr);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
