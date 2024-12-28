import express from 'express';
import { getDoctorPatients } from '../controllers/doctorController';

const router = express.Router();

router.get('/:doctorId/patients', getDoctorPatients);

export default router;
