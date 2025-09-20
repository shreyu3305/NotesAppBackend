import mongoose from 'mongoose';
import { env } from '../config/env.js';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    };

    await mongoose.connect(env.MONGO_URI, options);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('🔌 MongoDB disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDB();
  process.exit(0);
});
