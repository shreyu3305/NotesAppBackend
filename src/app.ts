import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { envWithComputed as env } from './config/env.js';
import { authRoutes } from './modules/auth/routes.js';
import { notesRoutes } from './modules/notes/routes.js';
import { errorHandler, notFoundHandler } from './middlewares/error.js';
import { authRateLimit, apiRateLimit } from './middlewares/rateLimit.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Cookie parsing middleware
app.use(cookieParser());

// Logging middleware
if (env.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
app.use('/api/v1/auth', authRateLimit);
app.use('/api/v1', apiRateLimit);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
