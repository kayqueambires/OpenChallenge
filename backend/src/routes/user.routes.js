import express from 'express';
import { createUser, getAllUsers, login } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/', login);
router.post('/', createUser);
router.get('/', getAllUsers);

export default router;
