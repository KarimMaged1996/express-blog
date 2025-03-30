import express from "express";
import dotenv from "dotenv";

// Initialize .env
dotenv.config();

const app = express();

// built in middleware
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
