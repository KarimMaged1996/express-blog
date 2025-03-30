import express from "express";
import dotenv from "dotenv";
import connectDb from "./db";

// Initialize .env
dotenv.config();

const app = express();

// built in middleware
app.use(express.json());

// connect to database
connectDb();

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
