import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import deviceRoutes from './routes/index';

const app = express();
// const PORT = 5051;

app.use(bodyParser.json());
app.use(cors());


app.use('/api', deviceRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export default app
