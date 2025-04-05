import dotenv from "dotenv";

// Initialize .env
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DATABASE_CONNECTION_STR: process.env.DB_CONNECTION_STR,
  GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
  GMAIL_PASSWORD: process.env.GMAIL_GENERATED_PASSWORD,
};

export default config;
