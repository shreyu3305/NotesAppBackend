import { Router } from 'express';
import { AuthController } from './controller.js';
import { authGuard } from '../../middlewares/authGuard.js';

const router = Router();

// Public routes
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);

// Protected routes
router.post('/logout', authGuard, AuthController.logout);
router.get('/me', authGuard, AuthController.me);

export { router as authRoutes };
