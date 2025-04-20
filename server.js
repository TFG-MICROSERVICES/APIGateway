import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sportRoutes from './routes/sportRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import eventRoutes from './routes/eventsRoutes.js';
import teamEvent from './routes/teamEventRoutes.js';
import { EventEmitter } from 'events';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

EventEmitter.defaultMaxListeners = 30;
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://app.sportsconnect.es'],
        exposedHeaders: 'Authorization',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Agrega los métodos que deseas permitir
    })
);

app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/sport', sportRoutes);

app.use('/api/team', teamRoutes);

app.use('/api/request', requestRoutes);

app.use('/api/event', eventRoutes);

app.use('/api/team-event', teamEvent);

app.use((req, res, next) => {
    console.log('Route not found');
    res.status(404).json({
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
