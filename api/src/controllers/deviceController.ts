import { Request, Response } from 'express';
import pool from '../models/db';

export const submitData = async (req: Request, res: Response) => {
  const { deviceType, manufacturer, metrics, timestamp } = req.body;

  try {
    const query = `
      INSERT INTO device_data (device_type, manufacturer, metrics, timestamp)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [deviceType, manufacturer, metrics, timestamp];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Data saved successfully', data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save data' });
  }
};


export const getData = async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM device_data ORDER BY timestamp DESC;');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch data' });
    }
  };