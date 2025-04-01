import express from "express";
import connectDb from "./db";
import errorHandler from "./error";
import config from "./config";

const app = express();

// built in middleware
app.use(express.json());

// connect to database
connectDb();

// use global error handler
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () =>
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${PORT}`)
);
