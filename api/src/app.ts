import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import healthRoutes from "./routes/healthRoutes"

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', healthRoutes);
export default app
