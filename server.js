import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import { EventEmitter } from 'events';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

EventEmitter.defaultMaxListeners = 30;
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth',authRoutes);


app.use((req,res,next) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.use((err,req,res,next) => {
    res.status(500).json({
        message: err.message
    });
});