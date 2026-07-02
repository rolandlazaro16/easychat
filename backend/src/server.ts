import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// Load environment variables from .env or .env.local
dotenv.config({ path: '../.env.local' });

import dbConnect from './config/db';
import { app, server } from './socket/socket';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Connect to Database
dbConnect()
  .then(() => console.log('Connected to MongoDB via dbConnect'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('Chat API is running');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
