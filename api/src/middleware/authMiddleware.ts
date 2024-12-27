import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import db from '../models/db';

interface TokenPayload {
    userId: number;
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

        const user = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        console.log('No user found for userId:', decoded);
        if (!user.rows.length) {
            console.log("USER:",user)
            console.log('No user found for userId:', decoded);
        }

        req.user = { id: decoded.userId, role: decoded.role }; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
