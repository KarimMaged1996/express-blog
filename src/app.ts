import express from "express";
import dotenv from "dotenv";
import connectDb from "./db";
import errorHandler from "./error";

// Initialize .env
dotenv.config();

const app = express();

// built in middleware
app.use(express.json());

// connect to database
connectDb();

// use global error handler
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${PORT}`)
);
