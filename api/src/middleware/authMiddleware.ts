import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import db from '../models/db';

interface TokenPayload {
    id: number;
    role: string;
    iat: number;
    exp: number;
}

export const authenticate = async (req:any, res:any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

        const user = await db.query('SELECT id, role_id FROM users WHERE id = $1', [decoded.id]);

        if (!user.rows.length) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = { id: decoded.id, role: decoded.role }; // Добавляем user в запрос
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
