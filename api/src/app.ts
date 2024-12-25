import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import deviceRoutes from './routes/index';
import authRoutes from "./routes/authRoutes"


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api', deviceRoutes);
app.use('/api/auth', authRoutes);

export default app
