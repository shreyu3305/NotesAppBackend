import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('4000'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  ACCESS_TTL: z.string().default('10m'),
  REFRESH_TTL: z.string().default('7d'),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
  COOKIE_DOMAIN: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

export const env = envSchema.parse(process.env);

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Add the computed properties to the env object
export const envWithComputed = {
  ...env,
  isDevelopment,
  isProduction,
  isTest
};
