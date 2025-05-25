// src/models/userModel.js
import { prisma as p } from '../models/prisma.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    const users = await p.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  try {
    const newUser = await p.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
