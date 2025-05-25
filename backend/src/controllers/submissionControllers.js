// src/models/submissionModel.js
import prisma from '../models/prisma.js';

export const createSubmission = async (data) => {
  return prisma.submission.create({ data });
};

export const getUserSubmissions = async (userId) => {
  return prisma.submission.findMany({ where: { userId } });
};

export const getChallengeSubmissions = async (challengeId) => {
  return prisma.submission.findMany({ where: { challengeId } });
};
