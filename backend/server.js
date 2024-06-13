import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectToMongoDB from "./database/connectToMongoDB.js";
import { app } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

dotenv.config();

//middleware
app.use(express.json());//to parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

//mounting the API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get("/" , (req,res) => {
    res.send("Hello World");
})


app.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
