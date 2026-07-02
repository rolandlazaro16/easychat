import express, { Response } from 'express';
import User from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';
import { upload } from '../config/cloudinary';

const router = express.Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const users = await User.find({ _id: { $ne: userId } }).select('-password');
    res.json({ users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/avatar', authenticate, upload.single('avatar'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!req.file) {
      res.status(400).json({ error: 'Avatar file is required' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: req.file.path },
      { new: true }
    ).select('-password');

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
