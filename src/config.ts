import dotenv from "dotenv";

// Initialize .env
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DATABASE_CONNECTION_STR: process.env.DB_CONNECTION_STR,
};

export default config;
