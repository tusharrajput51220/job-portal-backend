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
  origin: "https://job-portal-omega-five.vercel.app",
  // origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1", router);

app.get("*", (req,res)=>{
  res.json("Hello buddy")
})

const port = process.env.PORT || 8000;
app.listen(port, async () => {
  connectDB();
  console.log(`App is listening on port ${port}`);
});
