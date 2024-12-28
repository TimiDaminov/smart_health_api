import { Request, Response } from 'express';
import db from '../models/db'; 

export const getDoctorPatients = async (req: any, res: any) => {
    const doctorId = req.params.doctorId; 

    try {
        // Получаем список пациентов, привязанных к доктору
        const result = await db.query(
            `SELECT 
                p.id AS patient_id,
                u.first_name,
                u.last_name,
                u.email,
                p.created_at
             FROM 
                patients p
             JOIN 
                users u ON p.user_id = u.id
             WHERE 
                p.doctor_id = $1`,
            [doctorId]
        );

        // Если пациентов нет, возвращаем пустой список
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No patients found for this doctor' });
        }

        // Возвращаем список пациентов
        res.status(200).json({ patients: result.rows });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
