import express from 'express';
import challengeRoutes from './challenge.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import submissionRoutes from './submission.routes.js';

const router = express.Router();

router.use('/challenge', challengeRoutes);
router.use('/user', userRoutes);
router.use('/submission', submissionRoutes);
router.use('/auth', authRoutes);

export default router;
