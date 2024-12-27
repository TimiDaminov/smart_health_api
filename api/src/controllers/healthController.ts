
import db from '../models/db';

export const getHealthMetrics = async (req:any, res: any) => {
    try {
        const userId = req.user.id;

        const healthMetrics = await db.query(
            'SELECT * FROM health_metrics WHERE user_id = $1 ORDER BY timestamp DESC',
            [userId]
        );

        res.json(healthMetrics.rows);
    } catch (error) {
        console.error('Error fetching health metrics:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
