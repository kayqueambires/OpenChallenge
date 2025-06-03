import { prisma as p } from '../models/prisma.js';
import { JWT_SECRET } from '../index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Username, email and password are required.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await p.user.create({
      data: {
        username,
        email,
        role: 'USER',
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Congratulations, your account has been successfully created.',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log('Error registering user: ', error);

    if (error.code === 'P2002' && error.meta?.target) {
      if (error.meta.target.includes('username')) {
        return res.status(409).json({ message: 'Username already exist.' });
      }
      if (error.meta.target.includes('email')) {
        return res.status(409).json({ message: 'This email is being used' });
      }
    }
    res.status(500).json({
      message: 'Internal error when registering user.',
      error: error.message,
    });
  }
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password required.' });
  }

  try {
    const user = await p.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unregistered user' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error when logging in:', error);
    res.status(500).json({
      message: 'Internal error when logging in.',
      error: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await p.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
