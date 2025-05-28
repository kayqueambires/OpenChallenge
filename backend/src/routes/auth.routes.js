import express from 'express';
import { createUser, authUser } from '../controllers/userControllers.js';
import customCors from '../middleware/corsMiddleware.js'; // Importe o middleware

const router = express.Router();

router.post('/login', customCors, authUser);
router.post('/register', customCors, createUser);

export default router;
