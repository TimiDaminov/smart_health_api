import { Router } from 'express';
import { registerUser,loginUser } from '../controllers/authController'; 
import { body } from 'express-validator'; 

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('client_type').isIn(['patient', 'doctor']).withMessage('Invalid client type'),
  ],
    registerUser 
  
);

router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Invalid email format'),
      body('password').notEmpty().withMessage('Password is required'),
    ],
    loginUser
  );

export default router;
