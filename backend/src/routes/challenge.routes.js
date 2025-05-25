import express from 'express';
import {
  getAllChallenges,
  createChallenge,
  getChallengeByID,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengerControllers.js';

const router = express.Router();

router.get('/', getAllChallenges);
router.get('/:id', getChallengeByID);
router.post('/', createChallenge); // proteger depois
router.patch('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

export default router;
