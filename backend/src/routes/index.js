import express from 'express';
import challengeRoutes from './challenge.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/challenge', challengeRoutes);
router.use('/user', userRoutes);

export default router;
