import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"
import postRoutes from "./routes/post.routes.js"
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/posts", postRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get('/', (req, res) => {
//     res.send("Hello, world!")
// })

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
  connectDB();
});
