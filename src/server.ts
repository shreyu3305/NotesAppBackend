import { createServer } from 'http';
import app from './app.js';
import { connectDB } from './db/mongoose.js';
import { env } from './config/env.js';

const server = createServer(app);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start server
    server.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`📚 API Documentation: http://localhost:${env.PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${env.PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

startServer();
