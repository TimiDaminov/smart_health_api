import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express'; 
import db from '../models/db'; 

interface RegisterRequestBody {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    client_type: 'patient' | 'doctor'; 
}

interface LoginRequestBody {
    email: string;
    password: string;
}

export const registerUser = async (req:any,res:any) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, first_name, last_name, client_type } = req.body;

    try {
        let role = 'patient'; 
        if (client_type === 'doctor') {
            role = 'doctor';
        }

        const roleData = await db.query('SELECT id FROM roles WHERE name = $1', [role]);
        if (!roleData.rows.length) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const roleId = roleData.rows[0].id;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.query(
            'INSERT INTO users (email, password, role_id, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [email, hashedPassword, roleId, first_name, last_name]
        );

        const payload = {
            userId: user.rows[0].id,
            role: role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', userId: user.rows[0].id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const loginUser = async (req:any, res:any) => {
    const { email, password } = req.body;
    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { userId: user.id, role: user.role_id },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            userId: user.id,
            role: user.role_id,
            first_name: user.first_name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};