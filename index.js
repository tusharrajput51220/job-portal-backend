import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./main.route.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://jobportal-rouge-xi.vercel.app", // Your frontend domain
    "http://localhost:3000", 
    // "https://orange-space-trout-g4q65r5v999w2v5vq-3000.app.github.dev/"
  ],
  credentials: true, // Allow credentials (cookies) to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allow these HTTP methods
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Allow these headers
};
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options("*", cors(corsOptions));

app.use("/api/v1", router);

// app.get("*", (req, res) => {
//   res.json("Hello buddy");
// });

const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await connectDB();
  console.log(`App is listening on port ${port}`);
});
