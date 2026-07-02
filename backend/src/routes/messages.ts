import express, { Response } from 'express';
import Message from '../models/Message';
import { authenticate, AuthRequest } from '../middleware/auth';
import { upload } from '../config/cloudinary';
import { io, getReceiverSocketId } from '../socket/socket';

const router = express.Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const otherUserId = req.query.userId as string;

    if (!otherUserId) {
      res.status(400).json({ error: 'Missing userId parameter' });
      return;
    }

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // Oldest to newest

    // Mark messages as delivered if they were sent to the current user
    const undeliveredIds = messages
      .filter(m => m.receiverId.toString() === userId && !m.delivered)
      .map(m => m._id);

    if (undeliveredIds.length > 0) {
      await Message.updateMany(
        { _id: { $in: undeliveredIds } },
        { $set: { delivered: true } }
      );
      // Update the local objects so the response reflects the delivery status
      messages.forEach(m => {
        if (undeliveredIds.includes(m._id)) m.delivered = true;
      });
    }

    res.json({ messages });
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      res.status(400).json({ error: 'receiverId and content are required' });
      return;
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    
    const newMessage = await Message.create({
      senderId: userId,
      receiverId,
      content,
      messageType: 'text',
      delivered: !!receiverSocketId,
    });

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/media', authenticate, upload.single('media'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { receiverId, messageType } = req.body;
    
    if (!receiverId || !req.file) {
      res.status(400).json({ error: 'receiverId and media file are required' });
      return;
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    const newMessage = await Message.create({
      senderId: userId,
      receiverId,
      content: 'Media file',
      messageType: messageType || 'image',
      mediaUrl: req.file.path,
      delivered: !!receiverSocketId,
    });

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
