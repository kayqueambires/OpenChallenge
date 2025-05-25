// src/models/userModel.js
import { prisma as p } from '../models/prisma.js';

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  const encriptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await p.user.create({
      data: {
        email,
        encriptedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
