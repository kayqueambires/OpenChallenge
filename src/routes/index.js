import express from 'express';
import challengeRoutes from './challenge.routes.js'; // caminho relativo correto

const router = express.Router();

router.use('/challenges', challengeRoutes); // agora sim!

export default router;
