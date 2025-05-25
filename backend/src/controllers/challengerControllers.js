// src/models/challengeModel.js
import { prisma as p } from '../models/prisma.js';

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = p.challenge.findMany();
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error fetching challenges', error);
    res.status(500).json;
  }
};

export const getChallengeByID = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await p.challenge.findUnique({
      where: { id: Number(id) },
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error fetching challenge by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createChallenge = async (req, res) => {
  const { title, description, difficulty, solution } = req.body;

  if (!title || !description || !difficulty) {
    return res.status(400).json({
      message: 'Title, Description, Difficulty and Solution are required.',
    });
  }

  try {
    const newChallenge = await p.challenge.create({
      data: {
        title,
        description,
        difficulty,
        solution,
      },
    });

    return res.status(201).json(newChallenge);
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
      return res
        .status(409)
        .json({ message: 'There is already a challenge with this title.' });
    }

    console.error('Error creating challenge:', error);
    return res
      .status(500)
      .json({ message: 'Unable to create challenge.', error: error.message });
  }
};

export const updateChallenge = async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty } = req.body;

  try {
    const updateChallenge = await p.challenge.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        difficulty,
      },
    });
    return res.status(200).json(updateChallenge);
  } catch (error) {
    console.error('Error updating challenge:', error);

    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: 'Challenge not found for update.' });
    }
    if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
      return res.status(409).json({
        message: 'There is already another challenge with this title.',
      });
    }
    return res
      .status(500)
      .json({ message: 'Unable to update challenge.', error: error.message });
  }
};

export const deleteChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    await p.challenge.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error('Error deleting challenge:', error);
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: 'Challenge not found for deletion.' });
    }
    return res
      .status(500)
      .json({ message: 'Unable to delete challenge.', error: error.message });
  }
};
