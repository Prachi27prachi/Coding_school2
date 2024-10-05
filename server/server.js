import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  signUpController,
  loginController,
} from "./controllers/userController.js";
import connectDB from "./config/db.js";

// config env
dotenv.config(
  {path: './.env'}
);

// Database configuration
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.post("/api/signup", signUpController);
app.post("/api/login", loginController);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
