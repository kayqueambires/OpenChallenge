import { prisma as p } from '../models/prisma.js';
import { runCode } from '../services/pistonService.js';

const supportedLanguages = {
  python3: '3.10.0',
  javascript: '18.15.0',
  cpp: '10.2.0',
};

export const createSubmission = async (req, res) => {
  const { code, userId, challengeId, language } = req.body;

  if (!code || !userId || !challengeId || !language) {
    return res.status(400).json({
      message: 'code, userId, challengeId e language são obrigatórios.',
    });
  }

  if (!supportedLanguages[language]) {
    return res.status(400).json({
      message: `Linguagem não suportada. Use: ${Object.keys(
        supportedLanguages
      ).join(', ')}`,
    });
  }

  try {
    const challenge = await p.challenge.findUnique({
      where: { id: Number(challengeId) },
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge não encontrado.' });
    }

    const version = supportedLanguages[language];
    const pistonResult = await runCode({ language, version, code });

    const sanitizedOutput = pistonResult.output?.trim() ?? '';
    const sanitizedExpected = challenge.solution?.trim() ?? '';

    const passed = sanitizedOutput === sanitizedExpected;

    const submission = await p.submission.create({
      data: {
        code,
        result: sanitizedOutput,  
        passed,
        userId,
        challengeId,
        language,
      },
    });

    return res.status(201).json({
      message: 'Submissão registrada com sucesso.',
      submission,
      passed,
      output: sanitizedOutput,
      expected: sanitizedExpected,
    });
  } catch (error) {
    console.error('Erro ao criar submissão:', error);
    return res.status(500).json({
      message: 'Erro interno ao processar a submissão.',
      error: error.message,
    });
  }
};

export const getSubmissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const submission = await p.submission.findUnique({
      where: { id: Number(id)}
    });
    
    if (!challenge) {
      return res.status(404).json({message: 'Submission not found'})
    }
    res.status(200).json(submission);
  } catch (error){
    console.error('Error fetching submission by ID:', error);
    res.status(500).json({message: 'Internal server error'})
  }
};
