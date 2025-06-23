import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import songRoutes from './routes/songs.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/songs', songRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));