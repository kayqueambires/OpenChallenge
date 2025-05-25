import express from 'express';
import {
  getAllChallenges,
  createChallenge,
  getChallengeByID,
} from '../controllers/challengerControllers.js';

const router = express.Router();

router.get('/', getAllChallenges);
router.get('/:id', getChallengeByID);
router.post('/', createChallenge); // proteger depois

export default router;
