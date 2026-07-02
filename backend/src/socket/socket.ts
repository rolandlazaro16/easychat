import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

// Map to store connected users: { userId: socketId }
const userSocketMap: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    // Broadcast online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  }

  // Handle typing event
  socket.on('typing', ({ receiverId, isTyping }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing', { senderId: userId, isTyping });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }
  });
});
