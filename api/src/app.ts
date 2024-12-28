import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import healthRoutes from "./routes/healthRoutes"
import doctorRoutes from './routes/doctorRoutes';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/doctors', doctorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', healthRoutes);
export default app
