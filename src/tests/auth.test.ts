import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Endpoints', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
    });

    it('should return 409 for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      // First signup
      await request(app)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(201);

      // Second signup with same email
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(409);

      expect(response.body.error.code).toBe('USER_EXISTS');
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create a user for login tests
      const userData = {
        email: 'login@example.com',
        password: 'password123',
        name: 'Login User'
      };

      await request(app)
        .post('/api/v1/auth/signup')
        .send(userData);
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error.code).toBe('AUTH_INVALID');
    });
  });
});
