import { Request, Response } from 'express';
import db from '../models/db';
import jwt from 'jsonwebtoken';

export const getUser = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    const userId = decoded.userId;

    const user = await db.query('SELECT id, first_name, last_name, email FROM users WHERE id = $1', [userId]);

    if (!user.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user data' });
  }
};
